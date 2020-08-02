/** Makes a string harder to read. */
declare global {
    namespace NodeJS {
        interface Global {
            config: Function;
            language: Function;
            env: Function;
            logger: any;
            getVersion: Function;
            getError: Function;
            APIError: Object;
            Enum: {
                HttpErrorStatusCode: object;
                SystemErrorCode: object;
                HttpSuccessStatusCode: object;
            };
            APIResponse: Object;
        }
    }
}

export {};
