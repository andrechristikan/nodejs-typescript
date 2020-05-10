import app from './src/app';

class Server{
    public app: any = app;
    public server: any;

    constructor(){
        this.main();
    }

    private main = (): void => {
        this.server = this.app.listen(this.app.get('port'), this.app.get('host'), () => {
            logger.log({level:'info',message:trans('app.server.running')});
            logger.log({level:'info',message:trans('app.server.env')});
            logger.log({level:'info',message:trans('app.server.exit')});
        });
    }

}

export default new Server().server;
