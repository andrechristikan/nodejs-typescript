import { Router } from 'express';

class Route {
    private app: any;
    private routes: Array<object>;
    private middleware: any;
    private controllers: any;

    constructor(
        app: any,
        routes: Array<object>,
        controllers: any,
        middleware: any
    ) {
        this.app = app;
        this.routes = routes;
        this.controllers = controllers;
        this.middleware = middleware;
    }

    public create = (): void => {
        logger.info('Routes', this.routes);

        const router: any = Router();
        this.routes.forEach((value: defaultRoute) => {
            if (value.middleware) {
                const middleware = value.middleware.split('@');
                const classMiddleware = new this.middleware[middleware[0]]();
                router.use(value.prefix, classMiddleware[middleware[1]]);
            } else {
                value.routes.forEach((route: baseRoute) => {
                    const controller = route.controller.split('@');
                    const classController = new this.controllers[
                        controller[0]
                    ]();
                    if (route.middleware) {
                        const middleware = value.middleware.split('@');
                        const classMiddleware = new this.middleware[
                            middleware[0]
                        ]();
                        router[route.method](
                            `${value.prefix}${route.url}`,
                            classMiddleware[middleware[1]],
                            classController[controller[1]]
                        );
                    } else {
                        router[route.method](
                            `${value.prefix}${route.url}`,
                            classController[controller[1]]
                        );
                    }
                });
            }
        });

        // prefix route api
        this.app.use(`/${env('ROUTE_PREFIX')}/v${env('VERSION')}`, router);
    };
}

export default Route;
