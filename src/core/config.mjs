import configs from "../configs";

class Config {
  constructor() {}

  config = (keyString) => {
    let localConfig = configs;
    let key = keyString.split(".");

    for (let i = 0; i < key.length; i++) {
      localConfig = localConfig[key[i]];
    }

    return localConfig;
  };
}

export default Config;
