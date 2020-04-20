import dotenv from "dotenv";

class Env {
  constructor() {
    dotenv.config();
  }
  env = (keyString) => {
    let values = process.env;
    return values[keyString];
  };
}

export default Env;
