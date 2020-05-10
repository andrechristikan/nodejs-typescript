/** @type {import("../types/core")} */

class ResponseStructure {
  private defaultMessage: string

  constructor() {
    this.defaultMessage = trans('app.default.success');
  }

  public success = (message: string, data: any = null): response => {

    if (data !== null) {
      const response: {status: number; message: string; data?: any} = {
        status: 0,
        message: message || this.defaultMessage,
        data : data
      };
      return response;

    }
    
    const response: {status: number; message: string; data?: any} = {
      status: 0,
      message: message || this.defaultMessage,
    };


    return response;
  };

  public error = (message: string, data: any  = null): response => {
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