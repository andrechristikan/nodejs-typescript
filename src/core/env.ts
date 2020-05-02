// @ts-check
/** @type {import("../types/core")} */

import dotenv from 'dotenv';

class Env{
  constructor(){
    dotenv.config();
  }

  public env: any = (key: string) => {
    return process.env[key];
  }
}

const envClass = new Env();
global.env = envClass.env;
export default {};