const host: string = env('DB_HOST') || 'localhost:27017';
const name: string = env('DB_NAME') || 'databaseName';
const user: string = env('DB_USER') || '';
const password: string = env('DB_PASSWORD') || '';
const poolSize = 10;
const socketTimeoutMs = 45000;
const serverSelectionTimeoutMs = 5000;
const autoIndex = false;
const useNewUrlParser = true;
const useUnifiedTopology = true;
const useCreateIndex = true;
const url = `mongodb://${host}/${name}`;

export default {
  url,
  host,
  name,
  user,
  password,
  poolSize,
  socketTimeoutMs,
  serverSelectionTimeoutMs,
  autoIndex,
  useNewUrlParser,
  useUnifiedTopology,
  useCreateIndex,
};