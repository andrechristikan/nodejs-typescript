export default {
    page: {
        notFound: 'Page not Found',
    },
    default: {
        success: 'Default message.',
    },
    internalServerError: 'Internal Server Error',
    server: {
        running: `App is listening at http://${env('HOST')}:${env('PORT')}`,
        exit: 'Press CTRL-C to stop',
    },
    core: {
        running: 'Core is running',
        config: 'Config is running',
        env: 'Environment is running',
    },
    db: {
        refuse:
            'MongoDB connection error. Please make sure MongoDB is running. ',
        connected: `Database connected at ${config('database.url')}`,
    },
};
