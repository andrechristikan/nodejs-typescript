export default {
  format:
    ':remote-addr - :remote-user [:date[iso]] - HTTP/:http-version [:status] ":method :url" - "Request Header :req[header]" - \'Request Params :req-params\' - \'Request Body :req-body\' - "Response Header :res[header]" - \'Response :res-data\'  - :response-time ms ":referrer" ":user-agent"',
  logs: [
    {
      rules: {
        path: "./src/logs/access",
        size: "100M",
        maxSize: "200M",
        compress: true,
        interval: "1d",
      },
      // routes: ["/q2qw1", "/qqq", "/ttt"],
      routes: ["*"],
    },
  ],
};
