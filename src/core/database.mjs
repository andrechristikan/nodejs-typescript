import mongoose from "mongoose";

class Database {
  constructor() {}

  replica = async () => {
    let url = "";
    let hosts = config("database.host").split(",");
    hosts.forEach((item, index) => {
      url = url
        ? `${url},${item}:${config("database.port")}`
        : `${item}:${config("database.port")}`;
    });

    url = `mongodb://${url}/${config("database.name")}?replicaSet=${config(
      "database.replica_set_name"
    )}`;

    try {
      mongoose.connect(url, {
        user: config("database.user"),
        pass: config("database.password"),
        poolSize: config("database.pool-size"),
        autoIndex: config("database.auto-index"),
        serverSelectionTimeoutMS: config(
          "database.server-selection-timeout-ms"
        ),
        socketTimeoutMS: config("database.socket-timeout-ms"),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
      await this.databaseConnection();
    } catch (err) {
      console.error(trans("app.db.refuse"));
    }
    return mongoose;
  };

  single = async () => {
    let url = `mongodb://${config("database.host")}/${config("database.name")}`;

    try {
      mongoose.connect(url, {
        user: config("database.user"),
        pass: config("database.password"),
        poolSize: config("database.pool-size"),
        autoIndex: config("database.auto-index"),
        serverSelectionTimeoutMS: config(
          "database.server-selection-timeout-ms"
        ),
        socketTimeoutMS: config("database.socket-timeout-ms"),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
      this.databaseConnection();
    } catch (err) {
      console.error(trans(err, "app.db.refuse"));
    }
    return mongoose;
  };

  mongoDb = () => {
    return env("DB_MODEL") == "replica" ? this.replica() : this.single();
  };

  databaseConnection = async () => {
    mongoose.connection.on("error", (err) => {
      console.error(err, trans("app.db.refuse"));
    });
    mongoose.connection.on("disconnected", (err) => {
      console.error(err, trans("app.db.disconnect"));
    });
    mongoose.connection.once("open", () => {
      console.log(trans("app.db.connected"));
      // connection.close();
    });
    process.on("SIGINT", () => {
      mongoose.connection.close(() => {
        console.log(trans("app.db.closed"));
        process.exit(0);
      });
    });
  };
}

export default Database;
