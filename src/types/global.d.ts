import APIError from '../errors/ApiError';

declare global {
    namespace NodeJS {
        interface Global {
            config: Function,
            trans: Function,
            env: Function,
            logger: any,
            getVersion: Function,
            getError: Function,
            APIError: object,
        }
    }
}
