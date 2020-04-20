class Response {
  constructor() {
    this.defaultMessage = trans("app.default.messages");
  }

  success = (message, data = null) => {
    let response = {
      status: 0,
      message: message ? message : this.defaultMessage,
    };

    if (data !== null) {
      response.data = data;
    }

    return response;
  };

  error = (message, data = null) => {
    let response = {
      status: 1,
      message: message ? message : this.defaultMessage,
    };

    if (data !== null) {
      response.data = data;
    }

    return response;
  };
}

export default Response;
