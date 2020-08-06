const routers: defaultRoute[] = [
    {
        prefix: '/',
        routes: [
            {
                controller: 'TestController@test',
                url: '/',
                method: 'get',
            },
        ],
    },
    {
        prefix: '/auth',
        routes: [
            {
                controller: 'AuthController@login',
                url: '/login',
                method: 'post',
            },
            {
                controller: 'AuthController@signUp',
                url: '/sign-up',
                method: 'post',
            },
        ],
    },
    {
        prefix: '/test',
        middleware: 'AuthMiddleware@isAuthenticated',
    },
];

export default routers;
