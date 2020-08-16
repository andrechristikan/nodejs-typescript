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
        prefix: '/',
        middleware: 'AuthMiddleware@isAuthenticated',
    },
    {
        prefix: '/user',
        routes: [
            {
                controller: 'UserController@profile',
                url: '/profile',
                method: 'get',
            },
        ],
    },
];

export default routers;
