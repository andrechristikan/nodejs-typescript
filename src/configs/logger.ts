export default {
    httpRequest:{
        format: ':remote-addr - :remote-user [:date[iso]] - HTTP/:http-version [:status] ":method :url" - "Request Header :req[header]" - \'Request Params :req-params\' - \'Request Body :req-body\' - "Response Header :res[header]" - \'Response :res-data\'  - :response-time ms ":referrer" ":user-agent"',
        logs: [
            {
                rules: {
                    path: './logs/http',
                    size: '100M',
                    maxSize: '200M',
                    compress: true,
                    interval: '1d',
                },
                name:'access',
                routes: ['*'],
                includes: ['*'],
                // routes: ["/user"],
                // includes: [
                //   "clientError", 
                //   "serverError", 
                //   "success"
                // ],
            },
            {
                rules: {
                    path: './logs/http/error',
                    size: '100M',
                    maxSize: '200M',
                    compress: true,
                    interval: '1d',
                },
                name:'error',
                routes: ['*'],
                includes: [
                    'clientError', 
                    'serverError', 
                    // "success"
                ],
            },
        ],
    },
    system:{
        maxSize: '100m',
        maxFiles: null,
        name:'system',
    }
};