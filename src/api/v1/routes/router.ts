const routers: defaultRoute[] = [
    // {
    //     prefix: '/',
    //     middleware: 'aa',
    // },
    // {
    //     prefix: '/user',
    //     middleware: 'bb',
    // },
    // {
    //     prefix: '/user',
    //     routes: [
    //         {
    //             controller: 'UserController@list',
    //             url: '/',
    //             method: 'get',
    //             middleware: '',
    //         },
    //         {
    //             controller: 'UserController@get',
    //             url: '/:id',
    //             method: 'get',
    //             middleware: '',
    //         },
    //     ],
    // },
    {
        prefix: '/test',
        routes: [
            {
                controller: 'TestController@test',
                url: '/',
                method: 'get',
            }
        ],
    }
];

export default routers;
