/** @type {import("../types/core")} */

class ResponseStructure {
  private defaultMessage: any

  constructor() {
    this.defaultMessage = trans('app.default.success');
  }

  public success: any = (message: any, data: any = null) => {

    if (data !== null) {
      const response: {status: number; message: string; data: any} = {
        status: 0,
        message: message || this.defaultMessage,
        data : data
      };
      return response;

    }
    
    const response: {status: number; message: string} = {
      status: 0,
      message: message || this.defaultMessage,
    };


    return response;
  };

  public error: any = (message: any, data: any  = null) => {
    if (data !== null) {
      const response: {status: number; message: string; data: any} = {
        status: 1,
        message: message || this.defaultMessage,
        data : data
      };
      return response;
      
    }

    const response: {status: number; message: string} = {
      status: 1,
      message: message || this.defaultMessage,
    };

    return response;
  };
}

export default ResponseStructure;