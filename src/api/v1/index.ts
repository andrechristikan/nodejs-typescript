import router from './routes/router';
import languages from './languages';
import TestController from './test/TestController';
import APIError from './error/APIError';
import { SystemErrorCode } from './error/Enum';
import AuthMiddleware from './auth/AuthMiddleware';
import AuthController from './auth/AuthController';
import UserController from './user/UserController';
import VersionAbstractClass from '../../core/version/VersionAbstractClass';

class Version1 extends VersionAbstractClass {
    constructor() {
        super();
    }

    setMiddleware(): void {
        this.middleware = {
            AuthMiddleware,
        };
    }

    setErrors(): void {
        this.errors = {
            APIError,
            enum: {
                SystemErrorCode,
            },
        };
    }

    setRouter(): void {
        this.router = router;
    }

    setControllers(): void {
        this.controllers = {
            TestController,
            AuthController,
            UserController,
        };
    }

    setLanguages(): void {
        this.languages = languages;
    }
}
export default Version1;
