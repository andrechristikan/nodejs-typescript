export default {
    default: {
        success: 'Default message.',
    },
    server: {
        running: `App is listening at http://${config('core.host')}:${config('core.port')}`,
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
