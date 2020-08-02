import router from './routes/router';
import languages from './languages';
import TestController from './test/TestController';

const middleware = {

}

const controllers = {
    TestController
}

const versioning: baseVersioning = {
    router,
    middleware,
    controllers,
    languages
}

export default versioning