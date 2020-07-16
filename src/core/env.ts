import dotenv from 'dotenv';

class Env{
  constructor(){
    dotenv.config();
  }

  public env = (key: string): string => {
    return process.env[key];
  }
}

const envClass = new Env();
global.env = envClass.env;
export default {};