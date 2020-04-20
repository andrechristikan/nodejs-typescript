import morgan from "morgan";
import { createStream } from "rotating-file-stream";
import moment from "moment";

class Logger {
  constructor() {
    this.config = config("logger");
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

  allRequest = () => {
    // Setup The Logger
    console.log("11");
    const accessLogStream = createStream(
      `${moment().format("YYYY-MM-DD")}.log`,
      {
        interval: "1d", // rotate daily
        path: `./src/logs${this.config.rules["all-request"]}`,
      }
    );
    console.log("22");

    return morgan(this.config.format, {
      stream: accessLogStream,
    });
  };

  error = () => {
    // Setup The Logger
    const accessLogStream = createStream(
      `${moment().format("YYYY-MM-DD")}.log`,
      {
        interval: "1d", // rotate daily
        path: `./src/logs${this.config.rules.error}`,
      }
    );

    return morgan(this.config.format, {
      stream: accessLogStream,
      skip: (req, res, next) => {
        return res.statusCode < 400;
      },
    });
  };

  //   custome = () => {
  //     this.config.rules.custome.forEach((value, index, array) => {
  //       // Setup The Logger
  //       const accessLogStream = createStream(
  //         `${moment().format("YYYY-MM-DD")}.log`,
  //         {
  //           interval: "1d", // rotate daily
  //           path: `./logs${value.log_path}`,
  //           compress: this.config.compress,
  //         }
  //       );
  //       return morgan(this.config.format, {
  //         stream: accessLogStream,
  //         skip: (req, res, next) => {
  //           let url = req.originalUrl.replace(`${path_setting.route}`, "");
  //           return !url.startsWith(value.include_url);
  //         },
  //       });
  //     });
  //   };
}

export default Logger;
