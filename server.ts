import App from './src/app';

class Server {
    public server: App;

    constructor() {
        this.main();
    }

    private main = (): void => {
        this.run();
    };

    private run = (): void => {
        const appClass = new App();
        const app = appClass.app;
        this.server = app.listen(app.get('port'), app.get('host'), () => {
            logger.info(trans('app.server.running'));
            logger.info(trans('app.server.exit'));
        });
    };
}

const serverClass = new Server();
export default serverClass.server;
