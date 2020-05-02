declare global {
    namespace NodeJS {
        interface Global {
            config: any
            version: string
            responseStructure: object
            trans: any
            env: any,
            logger: any
        }
    }
}

export {};