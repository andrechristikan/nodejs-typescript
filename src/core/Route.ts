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

    public create(): void {
        logger.info('Routes', this.routes);

        const router: Router = Router();
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
                        this.setRoute(
                            router,
                            route.method,
                            `${value.prefix}${route.url}`,
                            classController[controller[1]],
                            classMiddleware[middleware[1]]
                        );
                    } else {
                        this.setRoute(
                            router,
                            route.method,
                            `${value.prefix}${route.url}`,
                            classController[controller[1]]
                        );
                    }
                });
            }
        });

        // prefix route api
        this.app.use(
            `/${config('core.routePrefix')}/v${config('core.version')}`,
            router
        );
    }

    private setRoute(
        router: Router,
        method: string,
        url: string,
        controller: any,
        middleware?: any
    ): void {
        switch (method) {
            case 'get':
                if (middleware) {
                    router.get(url, middleware, controller);
                } else {
                    router.get(url, controller);
                }
                break;
            case 'post':
                if (middleware) {
                    router.post(url, middleware, controller);
                } else {
                    router.post(url, controller);
                }
                break;
            case 'put':
                if (middleware) {
                    router.put(url, middleware, controller);
                } else {
                    router.put(url, controller);
                }
                break;
            case 'delete':
                if (middleware) {
                    router.delete(url, middleware, controller);
                } else {
                    router.delete(url, controller);
                }
                break;
            case 'patch':
                if (middleware) {
                    router.patch(url, middleware, controller);
                } else {
                    router.patch(url, controller);
                }
                break;
            default:
                if (middleware) {
                    router.get(url, middleware, controller);
                } else {
                    router.get(url, controller);
                }
                break;
        }
    }
}

export default Route;
