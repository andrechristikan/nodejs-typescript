export default {
  page: {
    notFound: 'Page not Found',
  },
  default: {
    success: 'Default message.',
  },
  'internal-server-error': 'Internal Server Error',
  server: {
    running: `${env('NAME')} app is listening at http://${env('HOST')}:${env('PORT')}`,
    env: 'Env in .env file '
  },
  db: {
    refuse: 'MongoDB connection error. Please make sure MongoDB is running. ',
    connected: 'Database connected',
  },
};
