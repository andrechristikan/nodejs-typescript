declare global {
    namespace NodeJS {
        interface Global {
            config: any
            responseStructure: any
            trans: any
            env: any,
            logger: any
        }
    }
}

export {};