import app from './src/app';

/**
 * Start Express server.
 */
const server = app.listen(app.get('port'), app.get('host'), () => {
    logger.log({level:'info',message:trans('app.server.running')});
    logger.log({level:'info',message:trans('app.server.env')});
    logger.log({level:'info',message:'Press CTRL-C to stop\n'});
});

export default server;
