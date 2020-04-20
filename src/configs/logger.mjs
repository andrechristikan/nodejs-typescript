export default {
  format:
    ':remote-addr - :remote-user [:date[iso]]',
  compress: true,
  rules: {
    "all-request": "/all-requests",
    error: "/errors",
    // custome: [
    //   {
    //     log_path: "/loan/report/outstanding",
    //     include_url: "/loan/report/outstanding",
    //   },
    // ],
  },
};
