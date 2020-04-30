declare global {
    namespace NodeJS {
        interface Global {
            config: Function
            version: string
            responseStructure: any
            trans: Function
            env: Function
        }
    }
}

export {};