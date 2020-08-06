import router from './routes/router';
import languages from './languages';
import TestController from './test/TestController';
import APIError from './errors/APIError';
import { SystemErrorCode } from './errors/Enum';
import AuthMiddleware from './auth/AuthMiddleware';
import AuthController from './auth/AuthController';
import VersionClass from '../VersionClass';

class Version1 extends VersionClass {
    constructor() {
        super();
    }

    protected setMiddleware = (): void => {
        this.middleware = {
            AuthMiddleware,
        };
    };

    protected setErrors = (): void => {
        this.errors = {
            APIError,
            enum: {
                SystemErrorCode,
            },
        };
    };

    protected setRouter = (): void => {
        this.router = router;
    };

    protected setControllers = (): void => {
        this.controllers = {
            TestController,
            AuthController,
        };
    };

    protected setLanguages = (): void => {
        this.languages = languages;
    };
}
export default Version1;
