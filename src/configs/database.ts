const model: string = env('DB_MODEL') || 'single';
const host: string = env('DB_HOST') || 'localhost';
const port: string = env('DB_PORT') || '27017';
const name: string = env('DB_NAME') || 'databaseName';
const user: string = env('DB_USER') || '';
const password: string = env('DB_PASSWORD') || '';
const replicaSetName: string = env('DB_REPLICA_SET_NAME') || '';
const poolSize = 10;
const socketTimeoutMs = 45000;
const serverSelectionTimeoutMs = 5000;
const autoIndex = false;
const useNewUrlParser = true;
const useUnifiedTopology = true;
const useCreateIndex = true;
let url: string;

if(model === 'replica'){
  const hosts: string[] = host.split(',');
  const ports: string[] = port.split(',');
  
  hosts.forEach((item: string, index: number) => {
    url = url
      ? `${url},${item}:${ports[index] || ports[0]}`
      : `${item}:${ports[index] || ports[0]}`;
  });

  // url = `mongodb://${url}/${name}?replicaSet=${replicaSetName}`;
  url = `mongodb://${user}:${password}/${name}@${url}?replicaSet=${replicaSetName}`;
}else{
  // url = `mongodb://${host}:${port}/${name}`;
  url = `mongodb://${user}:${password}@${host}:${port}/${name}`;
}


export default {
  url,
  model,
  host,
  port,
  name,
  user,
  password,
  replicaSetName ,
  poolSize,
  socketTimeoutMs,
  serverSelectionTimeoutMs,
  autoIndex,
  useNewUrlParser,
  useUnifiedTopology,
  useCreateIndex,
};