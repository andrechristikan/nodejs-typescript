export default {
  model: env("DB_MODEL") ? env("DB_MODEL") : "single",
  host: env("DB_HOST") ? env("DB_HOST") : "localhost",
  port: env("DB_PORT") ? env("DB_PORT") :  27017,
  name: env("DB_NAME") ? env("DB_NAME") : "databaseName",
  user: env("DB_USER") ? env("DB_USER") : "",
  password: env("DB_PASSWORD") ? env("DB_PASSWORD") : "",
  "replica-set-name": env("DB_REPLICA_SET_NAME") ? env("DB_REPLICA_SET_NAME") : "",
  "pool-size": 10,
  "socket-timeout-ms": 45000,
  "server-selection-timeout-ms": 5000,
  "auto-index": false,
};