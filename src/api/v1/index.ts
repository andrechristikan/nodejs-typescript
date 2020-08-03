import router from './routes/router';
import languages from './languages';
import TestController from './test/TestController';
import APIError from './errors/APIError';
import { SystemErrorCode } from './errors/Enum';
import AuthMiddleware from './auth/AuthMiddleware';
import AuthController from './auth/AuthController';

class Version1 {
    private middleware: any;
    private errors: any;
    private router: defaultRoute[];
    private controllers: any;
    private languages: object;

    constructor() {
        this.setMiddleware();
        this.setErrors();
        this.setRouter();
        this.setControllers();
        this.setLanguages();
    }

    public get() {
        const setVersion: baseVersioning = {
            router: this.router,
            middleware: this.middleware,
            controllers: this.controllers,
            languages: this.languages,
            errors: this.errors,
        };
        return setVersion;
    }

    private setMiddleware = () => {
        this.middleware = {
            AuthMiddleware
        };
    };

    private setErrors = () => {
        this.errors = {
            APIError,
            enum: {
                SystemErrorCode,
            },
        };
    };

    private setRouter = () => {
        this.router = router;
    };

    private setControllers = () => {
        this.controllers = {
            TestController,
            AuthController
        };
    };

    private setLanguages = () => {
        this.languages = languages;
    };
}
export default Version1;
