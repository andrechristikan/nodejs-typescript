import dotenv from 'dotenv';

class Env {
    public env: any;

    constructor() {
        this.set();
    }

    private set = (): void => {
        dotenv.config();
        this.env = process.env;
    };

    public get = (key: string): string => {
        return this.env[key];
    };
}

const configEnv = new Env();
global.env = configEnv.get;
export default configEnv.env;
