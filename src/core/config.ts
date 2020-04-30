/** @type {import("../types/core")} */
import configs from '../configs';

class Config {
  public config: any = (keys: string) => {
    let localConfig: any = configs;
    const key: Array<string> = keys.split('.');

    for (let i = 0; i < key.length; i += 1) {
      localConfig = localConfig[key[i]];
    }

    const result: string = localConfig;
    return result;
  };
}

const configClass = new Config();
global.config = configClass.config;
export default configClass.config;