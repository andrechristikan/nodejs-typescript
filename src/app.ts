import express, {
    Request,
    Response,
    NextFunction,
    ErrorRequestHandler,
} from 'express';
import path from 'path';
import compression from 'compression';
import session from 'express-session';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import hpp from 'hpp';
import mongo from 'connect-mongo';
import helper from './helpers';
import { request as requestLogger } from './core/Logger';

import Core from './core';

class App {
    public app: any;

    constructor() {
        this.main();
    }

    private main(): void {
        // Configuration App
        this.app = express();
        const coreClass = new Core();
        coreClass.run();

        // DatabaseSession
        const MongoStore = mongo(session);
        const sessionMongoStoreSetting = {
            store: new MongoStore({
                url: config('database.url'),
                autoReconnect: true,
            }),
        };

        this.app.set('port', env('PORT') || 3000);
        this.app.set('host', env('HOST') || 'localhost');
        this.app.use(compression());
        this.app.use(cors(config('cors')));
        this.app.use(helmet());
        this.app.use(hpp());
        this.app.use(bodyParser.urlencoded(config('bodyParser.urlencoded')));
        this.app.use(bodyParser.json(config('bodyParser.json')));
        this.app.use(
            session({
                ...config('session'),
                ...sessionMongoStoreSetting,
            })
        );

        // Static file
        this.app.use(express.static(path.join(__dirname, 'public')));

        // Request Logger
        config('logger.request.logs').forEach((value: log) => {
            this.app.use(requestLogger(value));
        });

        // Request Logger - Restructuring response
        this.app.use((req: Request, res: any, next: NextFunction) => {
            const send: any = res.send;

            // Add response data to response
            res.send = (body: any) => {
                res.resData = body;
                res.send = send;
                res.send(body);
            };
            next();
        });

        // Set Helper
        // const { ResponseHelper } = helper;
        // const { success, error, list } = new ResponseHelper();
        // global.responseSuccess = success;
        // global.responseError = error;
        // global.responseList = list;

        // Router
        // const router = routers[`v${env('VERSION')}`];
        // console.log(router);
        // this.app.use(`/${env('ROUTE_PREFIX')}/v${env('VERSION')}`, router);

        // Error Handler
        // this.app.use((req: Request, res: Response) => {
        //     const response = responseError(trans('app.page.notFound'));
        //     res.status(404).json(response);
        // });

        // this.app.use(
        //     (err: ErrorRequestHandler, req: Request, res: Response) => {
        //         const response =
        //             env('ENV') === 'production'
        //                 ? responseError(trans('app.internalServerError'))
        //                 : responseError(trans('app.internalServerError'), err);
        //         res.status(500).json(response);
        //     }
        // );
    }
}

export default App;
