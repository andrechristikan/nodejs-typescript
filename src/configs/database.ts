const model: string = env('DB_MODEL') || 'single';
const host: string = env('DB_HOST') || 'localhost';
const port: string = env('DB_PORT') || 27017;
const name: string = env('DB_NAME') || 'databaseName';
const user: string = env('DB_USER') || '';
const password: string = env('DB_PASSWORD') || '';
const replicaSetName: string = env('DB_REPLICA_SET_NAME') || '';
let url: string;

if(model === 'replica'){
  const hosts: string[] = host.split(',');
  hosts.forEach((item: string, index: number) => {
    url = url
      ? `${url},${item}:${port}`
      : `${item}:${port}`;
  });

  url = `mongodb://${url}/${name}?replicaSet=${replicaSetName}`;
}else{
  url = `mongodb://${host}:${port}/${name}`;
}


export default {
    url,
    model,
    host,
    port,
    name,
    user,
    password,
    replicaSetName,
    poolSize: 10,
    socketTimeoutMs: 45000,
    serverSelectionTimeoutMs: 5000,
    autoIndex: false,
  };