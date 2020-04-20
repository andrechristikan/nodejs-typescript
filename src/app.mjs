import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import Languange from "./helpers/languange";
import Env from "./helpers/env";
import Response from "./helpers/response";
import Config from "./helpers/config";
import Logger from "./helpers/logger";
import routers from "./routes";
import bodyParser from "body-parser";
import cors from "cors";
import csrf from "csurf";

const app = express();
const { env } = new Env();
const { config } = new Config();
global.config = config;
global.env = env;

const languange = new Languange(env("LANGUAGE"));
const logger = new Logger();
global.trans = languange.trans;
global.structure = new Response();
global.csrf = csrf(config("csrf"));


config("logger.logs").forEach( (value, index, array) => {
  app.use(logger.create(value));
});
app.use(bodyParser.urlencoded(config("body-parser.urlencoded")));
app.use(bodyParser.json(config("body-parser.json")));
app.use(bodyParser.raw(config("body-parser.raw")));
app.use(cors(config("cors")));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  let send = res.send;
  res.send = (body) => {
    res.resData = body;
    res.send = send;
    res.send(body);
  };
  next();
});

app.use(`/${env("ROUTE_PREFIX")}/v${env("VERSION")}`, routers);

app.use((req, res, next) => {
  let json = structure.error(trans("app.page.not-found"));
  res.status(404).json(json);
});

app.use((err, req, res, next) => {
  let json =
    env("NODE_ENV") == "production"
      ? structure.error(trans("app.internal_server_error"))
      : err;
  res.status(500).json(json);
});

app.listen(env("PORT"), env("HOST"), () => {
  console.log(
    `${env("NAME")} ${trans("app.server.running")} http://${env("HOST")}:${env(
      "PORT"
    )}`
  );
});

export default app;
