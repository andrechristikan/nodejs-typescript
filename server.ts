import App from './src/app';

class Server{
    public server: App;

    constructor(){
        this.main();
    }

    private main = (): void => {
        const appClass = new App();
        const app = appClass.app;
        
        this.server = app.listen(app.get('port'), app.get('host'), () => {
            logger.log({level:'info',message:trans('app.server.running')});
            logger.log({level:'info',message:trans('app.server.env')});
            logger.log({level:'info',message:trans('app.server.exit')});
        });
    }

}

const serverClass = new Server();
export default serverClass.server;
