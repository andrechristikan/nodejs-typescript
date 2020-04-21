import morgan from "morgan";
import { createStream } from "rotating-file-stream";
import moment from "moment";

class Logger {
  constructor() {
    morgan.token("req-params", (req, res) => {
      return JSON.stringify(req.params);
    });

    morgan.token("req-body", (req, res) => {
      return JSON.stringify(req.body);
    });

    morgan.token("res-data", (req, res) => {
      return res.resData;
    });
  }

  logger = (log) => {
    // Setup The Logger
    const accessLogStream = createStream(
      `${moment().format("YYYY-MM-DD")}.log`,
      log.rules
    );

    const skip = (req, res, next) => {
      let url = req.originalUrl.replace(
        `/${env("ROUTE_PREFIX")}/v${env("VERSION")}`,
        ""
      );

      let flag = true;
      if (log.routes.includes("*")) {
        flag = false;
      } else {
        for (let value of log.routes) {
          flag = flag && (url == value ? false : true);
          if (!flag) break;
        }
      }

      if (!flag) {
        if (log.includes.includes("*")) {
          flag = false;
        } else {
          flag = true;
          for (let value of log.includes) {
            if (
              value == "client-error" &&
              res.statusCode >= 400 &&
              res.statusCode < 500
            ) {
              flag = false;
            } else if (value == "server-error" && res.statusCode >= 500) {
              flag = false;
            } else if (value == "success" && res.statusCode < 400) {
              flag = false;
            }
          }
        }
      }

      return flag;
    };

    return morgan(config("logger.format"), {
      stream: accessLogStream,
      skip: skip,
    });
  };
}

export default Logger;
