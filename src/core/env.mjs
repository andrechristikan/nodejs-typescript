import dotenv from "dotenv";

dotenv.config();
const env = (keyString) => {
  let values = process.env;
  return values[keyString];
};

global.env = env;

export default env;
