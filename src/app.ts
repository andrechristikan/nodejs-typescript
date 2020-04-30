import express, {Request, Response, NextFunction, ErrorRequestHandler} from 'express';
import path from 'path';
import compression from 'compression'; 
import session from 'express-session';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import hpp from 'hpp';
import env from './core/env';
import config from './core/config';
import core from './core';
import mongo from 'connect-mongo';

// Express configuration
const app = express();
const { Language, ResponseStructure, Database } = core;
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

// Set responseStructure
const responseStructure = new ResponseStructure();
global.responseStructure = responseStructure;

app.set('port', env('PORT') || 3000);
app.set('host', env('HOST') || 'localhost');
app.use(compression());
app.use(cors(config('cors')));
app.use(helmet());
app.use(hpp());
app.use(bodyParser.urlencoded(config('body-parser.urlencoded')));
app.use(bodyParser.json(config('body-parser.json')));
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
      ? responseStructure.error(trans('app.internal-server-error'))
      : responseStructure.error(err);
  res.status(500).json(response);
});


export default app;
