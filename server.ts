import app from './src/app';

/**
 * Start Express server.
 */
const server = app.listen(app.get('port'), app.get('host'), () => {
    console.log(trans('app.server.running'));
    console.log(trans('app.server.env'));
    console.log('Press CTRL-C to stop\n');
});

export default server;
