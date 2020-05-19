/** @type {import("../types/core")} */

class ResponseStructure {
  private defaultMessage: string

  constructor() {
    this.defaultMessage = trans('app.default.success');
  }

  public success = (message: string, data: any = null): response => {

    if (data !== null) {
      const response: response = {
        status: 0,
        message: message || this.defaultMessage,
        data : data
      };
      return response;

    }
    
    const response: response = {
      status: 0,
      message: message || this.defaultMessage,
    };


    return response;
  };

  public error = (message: string, data: any  = null): response => {
    if (data !== null) {
      const response: response = {
        status: 1,
        message: message || this.defaultMessage,
        data : data
      };
      return response;
      
    }

    const response: response = {
      status: 1,
      message: message || this.defaultMessage,
    };

    return response;
  };

  public list = (message: string, count: number, data: any): responseList => {

    const limit: number = config('up.limitList');
    let totalPage = 0;
    if(count > 0){
      totalPage = Math.ceil(count/limit);
    }
    
    const response: responseList = {
      status: 0,
      message,
      count,
      totalPage,
      data: data
    };

    return response;
  };
}

export default ResponseStructure;