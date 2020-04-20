import morgan from "morgan";
import { createStream } from "rotating-file-stream";
import moment from "moment";
import e from "express";

class Logger {
  constructor() {
    morgan.token("req-params", (req, res) => {
      return JSON.stringify(req.params);
    });

    morgan.token("req-body", (req, res) => {
      return JSON.stringify(req.body);
    });

    morgan.token("res-data", (req, res) => {
      return JSON.stringify(res.resData);
    });
  }

  create = (conf) => {
    // Setup The Logger
    const accessLogStream = createStream(
      `${moment().format("YYYY-MM-DD")}.log`,
      conf.rules
    );

    const skip = (req, res, next) => {
      let url = req.originalUrl.replace(
        `/${env("ROUTE_PREFIX")}/v${env("VERSION")}`,
        ""
      );

      let route = true;
      if (conf.routes.includes("*")) {
        route = false;
      } else {

        for (let value of conf.routes) {
          route = route && (url == value ? false : true);
          if (!route) break;
        }

        // if(route){

        // }
        
      }
      return route;
    };

    return morgan(config("logger.format"), {
      stream: accessLogStream,
      skip: skip,
    });
  };
}

export default Logger;
