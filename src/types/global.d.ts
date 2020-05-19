declare global {
    namespace NodeJS {
        interface Global {
            config: Function
            responseStructureError: Function
            responseStructureSuccess: Function
            responseStructureList: Function
            trans: Function
            env: Function,
            logger: any
        }
    }
}

export {};