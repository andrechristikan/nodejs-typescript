import Env from './Env';
import Config from './Config';
import Language from './Language';
import Database from './Database';
import { system } from './Logger';
import { getVersion } from './Version';
import APIError from '../errors/ApiError';
import APIResponse from './APIResponse';
import {
    HttpErrorStatusCode,
    SystemErrorCode,
    HttpSuccessStatusCode,
} from './Enum';

class Core {
    private env: any;
    private config: any;
    private languages: object;

    constructor(languages: object) {
        this.languages = languages;
    }

    public run(): void {
        // ? Init Additional
        this.setVersion();
        this.setLanguage();
        this.setLogger();
        this.setCore();
        this.setDatabase();
        this.setEnum();
        this.setError();
        this.setResponse();

        // ? Running Core
        logger.info(language('_core.app.core.env'));
        logger.info(language('_core.app.core.config'));
        logger.info(language('_core.app.core.running'));
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
        const languageClass = new Language();
        languageClass.setLanguage(this.languages);
        const { language } = languageClass;
        global.language = language;
    };

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

    private setResponse = (): void => {
        global.APIResponse = APIResponse;
    };

    private setEnum = () => {
        global.Enum = {
            HttpErrorStatusCode,
            SystemErrorCode,
            HttpSuccessStatusCode,
        };
    };
}

export default Core;
