import configs from '../configs';

class Config {
    public configs: object | string;

    constructor() {
        this.set();
    }

    private set(): void {
        this.configs = configs;
    }

    public get = (keys: string): object | string | Array<string> => {
        let localConfig: any = this.configs;
        const key: Array<string> = keys.split('.');

        for (let i = 0; i < key.length; i += 1) {
            localConfig = localConfig[key[i]];
        }

        const result: object | string | Array<string> = localConfig;
        return result;
    };
}

const configClass = new Config();
global.config = configClass.get;
export default configClass.configs;
