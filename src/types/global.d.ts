declare global {
    namespace NodeJS {
        interface Global {
            config: Function
            responseSuccess: Function
            responseError: Function
            responseList: Function
            trans: Function
            env: Function,
            logger: any
        }
    }
}

export {};