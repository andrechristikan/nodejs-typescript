import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import env from "./core/env";
import core from "./core";
import routers from "./api";
import { urlencoded, json, raw } from "body-parser";
import cors from "cors";
import csrf from "csurf";

const app = express();
const { Language, Logger, Response, Config, Database } = core;
const { config } = new Config();
global.config = config;

const { trans } = new Language(env("LANGUAGE"));
const { logger } = new Logger();
const { mongoDb } = new Database();
mongoDb();
global.trans = trans;
global.structure = new Response();
global.csrf = csrf(config("csrf"));

config("logger.logs").forEach((value, index, array) => {
  app.use(logger(value));
});
app.use(urlencoded(config("body-parser.urlencoded")));
app.use(json(config("body-parser.json")));
app.use(raw(config("body-parser.raw")));
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

const router = routers[`v${env("VERSION")}`];
app.use(`/${env("ROUTE_PREFIX")}/v${env("VERSION")}`, router);

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
