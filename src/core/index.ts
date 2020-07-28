import Env from './Env';
import Config from './Config';
import Language from './Language';
import Database from './Database';
import { system } from './Logger';
import { getVersion } from './Version';
import APIError from '../errors/ApiError';

class Core {
    private env: any;
    private config: any;

    public run(): void {
        // Init Additional
        this.setVersion();
        this.setLanguage();
        this.setLogger();
        this.setCore();
        this.setDatabase();
        this.setError();

        // Running Core
        logger.info(trans('app.core.env'));
        logger.info(trans('app.core.config'));
        logger.info(trans('app.core.running'));
        if (env('ENV') === 'production') {
            logger.info(this.env);
            logger.info(this.config);
        }
    }

    private setCore = (): void => {
        this.env = Env;
        this.config = Config;
    };

    private setLanguage = (): void => {
        const { trans } = new Language(env('LANGUAGE'));
        global.trans = trans;
    };

    // System Logger
    private setLogger = (): void => {
        global.logger = system();
    };

    private setDatabase = (): void => {
        const databaseClass = new Database();
        databaseClass.create();
    };

    private setVersion = (): void => {
        global.getVersion = getVersion;
    };

    private setError = (): void => {
        global.APIError = APIError;
    };
}

export default Core;
