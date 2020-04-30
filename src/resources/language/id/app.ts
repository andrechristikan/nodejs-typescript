export default {
  page: {
    notFound: 'Page not Found',
  },
  default: {
    message: 'Default message.',
  },
  'internal-server-error': 'Internal Server Error',
  server: {
    running: `${env('NAME')} app is listening at http://${env('HOST')}:${env('PORT')}`,
    env: 'Env in .env file '
  },
  db: {
    refuse: 'Database refuse',
    disconnect: 'Database disconnected',
    connected: 'Database connected',
    closed:
      'Mongoose default connection is disconnected due to application termination',
  },
  mailer: {
    ready: 'Server is ready to send email.',
    failedSend: 'Fail to send email',
  },
  router: {
    error: 'Something happen when creating router',
  },
};
