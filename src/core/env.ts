import dotenv from 'dotenv';

class Env {
    constructor() {
        this.set();
    }

    private set(): void {
        dotenv.config();
    }

    public get(key: string): string {
        return process.env[key];
    }
}

const configEnv = new Env();
global.env = configEnv.get;
export default process.env;
