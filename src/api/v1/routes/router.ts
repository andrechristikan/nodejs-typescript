const routers: defaultRoute[] = [
    {
        prefix: '/',
        routes: [
            {
                controller: 'TestController@index',
                url: '/',
                method: 'get',
            },
        ],
    },
    {
        prefix: '/login',
        routes: [
            {
                controller: 'AuthController@login',
                url: '/',
                method: 'post',
            },
        ],
    },
    {
        prefix: '/test',
        middleware: 'AuthMiddleware@isAuthenticated',
    },
    {
        prefix: '/test',
        routes: [
            {
                controller: 'TestController@test',
                url: '/',
                method: 'get',
            },
        ],
    },
];

export default routers;
