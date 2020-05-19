import bodyParser from './body-parser';
import cors from './cors';
import database from './database';
import session from './session';
import logger from './logger';
import auth from './auth';
import up from './up';

export default {
  bodyParser: bodyParser,
  cors,
  database,
  session,
  logger,
  auth,
  up
};