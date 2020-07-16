import express, {Request, Response, NextFunction, ErrorRequestHandler} from 'express';
import path from 'path';
import compression from 'compression'; 
import session from 'express-session';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import hpp from 'hpp';
import core from './core';
import mongo from 'connect-mongo';
import helper from './helpers';
// import routers from './app';


class App {

  public app: any;

  constructor () {
    this.main();
  }

  private main(): void {

    // Configuration App
    this.app = express();
    const { Language, Logger, Database } = core;
    const { trans } = new Language(env('LANGUAGE'));
    global.trans = trans;
    
    // Database
    const { db } = new Database();
    db();
    const MongoStore = mongo(session);
    const sessionMongoStoreSetting = {
      store: new MongoStore({
        url: config('database.url'),
        autoReconnect: true
      })
    };
    
    // Set Helper
    const { ResponseHelper } = helper;
    const { success, error, list} = new ResponseHelper();
    global.responseSuccess = success;
    global.responseError = error;
    global.responseList = list;
    
    this.app.set('port', env('PORT') || 3000);
    this.app.set('host', env('HOST') || 'localhost');
    this.app.use(compression());
    this.app.use(cors(config('cors')));
    this.app.use(helmet());
    this.app.use(hpp());
    this.app.use(bodyParser.urlencoded(config('bodyParser.urlencoded')));
    this.app.use(bodyParser.json(config('bodyParser.json')));
    this.app.use(session({
      ...config('session'),
      ...sessionMongoStoreSetting
    }));
    
    // Static file
    this.app.use(express.static(path.join(__dirname, 'public')));
    
    // Logger
    const loggerClass = new Logger();
    global.logger = loggerClass.system();
    config('logger.httpRequest.logs').forEach((value: log) => {
      this.app.use(loggerClass.httpRequest(value));
    });
    
    // Restructuring response object
    this.app.use((req: Request, res: any, next: NextFunction) => {
      const send: any = res.send;
    
      // Add response data to response object
      res.send = (body: any) => {
        res.resData = body;
        res.send = send;
        res.send(body);
      };
      next();
    });
    
    // Router
    // const router = routers[`v${env('VERSION')}`];
    // console.log(router);
    // this.app.use(`/${env('ROUTE_PREFIX')}/v${env('VERSION')}`, router);
    
    // Error Handler
    this.app.use((req: Request, res: Response) => {
      const response = responseError(trans('app.page.notFound'));
      res.status(404).json(response);
    });
    
    this.app.use((err: ErrorRequestHandler, req: Request, res: Response) => {
      const response =
        env('ENV') !== 'development'
          ? responseError(trans('app.internalServerError'))
          : responseError(trans('app.internalServerError'), err);
      res.status(500).json(response);
    });
  }
}


export default App;
