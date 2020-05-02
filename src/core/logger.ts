import { createLogger, format, transports } from 'winston';
import morgan from 'morgan';
import { createStream } from 'rotating-file-stream';
import moment from 'moment';
import {Request, Response, NextFunction} from 'express';
import DailyRotateFile from 'winston-daily-rotate-file';


class Logger {
  constructor() {
    morgan.token('req-params', (req: Request, res: Response) => {
      return JSON.stringify(req.params);
    });

    morgan.token('req-body', (req: Request, res: Response) => {
      return JSON.stringify(req.body);
    });

    morgan.token('res-data', (req: Request, res: any) => {
      return res.log.data;
    });
  }

  public httpRequest: any = (log: any) => {
    // Setup The Logger
    const accessLogStream = createStream(
      `${log.name ? log.name+'-' : ''}${moment().format('YYYY-MM-DD')}.log`,
      log.rules
    );

    const skip: any = (req: Request, res: Response, next: NextFunction) => {
      const url: string = req.originalUrl.replace(
        `/${env('ROUTE_PREFIX')}/v${env('VERSION')}`,
        ''
      );

      let flag = true;
      if (log.routes.includes('*')) {
        flag = false;
      } else {
        for (const value of log.routes) {
          flag = flag && (url == value ? false : true);
          if (!flag) break;
        }
      }

      if (!flag) {
        if (log.includes.includes('*')) {
          flag = false;
        } else {
          flag = true;
          for (const value of log.includes) {
            if (
              value == 'clientError' &&
              res.statusCode >= 400 &&
              res.statusCode < 500
            ) {
              flag = false;
            } else if (value == 'serverError' && res.statusCode >= 500) {
              flag = false;
            } else if (value == 'success' && res.statusCode < 400) {
              flag = false;
            }
          }
        }
      }

      return flag;
    };

    return morgan(config('logger.httpRequest.format'), {
      stream: accessLogStream,
      skip: skip,
    });
  };

  public system = () => {

    const { combine, timestamp, prettyPrint } = format;
    const configTransport = new DailyRotateFile({
      filename: `./logs/system/${config('logger.system.name')}-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: config('logger.system.maxSize'),
      maxFiles: config('logger.system.maxFiles')
    });
    
    const logger = createLogger({
      format: combine(
        timestamp(),
        prettyPrint()
      ),
      transports: [
        new transports.Console(),
        configTransport,
      ]
    });
    
    return logger;
  }
}


// Logger
const loggerClass = new Logger();
global.logger = loggerClass.system();
export default Logger;