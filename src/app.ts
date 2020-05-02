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

// Express configuration
const app = express();
const { Language, Logger } = core;
const { trans } = new Language(env('LANGUAGE'));
const MongoStore = mongo(session);
const sessionMongoStoreSetting = {
  store: new MongoStore({
    url: config('database.url'),
    autoReconnect: true
  })
};
global.trans = trans;
global.version = env('VERSION');

// Set Helper
const { ResponseStructure } = helper;
const responseStructure = new ResponseStructure();
global.responseStructure = responseStructure;

// Logger
const loggerClass = new Logger();
config('logger.httpRequest.logs').forEach((value: any, index: number) => {
  app.use(loggerClass.httpRequest(value));
});

app.set('port', env('PORT') || 3000);
app.set('host', env('HOST') || 'localhost');
app.use(compression());
app.use(cors(config('cors')));
app.use(helmet());
app.use(hpp());
app.use(bodyParser.urlencoded(config('bodyParser.urlencoded')));
app.use(bodyParser.json(config('bodyParser.json')));
app.use(session({
  ...config('session'),
  ...sessionMongoStoreSetting
}));

// Static file
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req: Request, res: Response) => {
    const response = responseStructure.success(trans('app.default.success'));
    res.status(200).json(response);
});

app.use((req: Request, res: Response) => {
  const response = responseStructure.error(trans('app.page.notFound'));
  res.status(404).json(response);
});

app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  const response =
    env('ENV') !== 'development'
      ? responseStructure.error(trans('app.internalServerError'))
      : responseStructure.error(err);
  res.status(500).json(response);
});


export default app;
