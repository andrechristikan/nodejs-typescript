/** @type {import("../types/core")} */
import  { getTotalPage } from "../helpers/ListHelper";

class ResponseStructure {
  private defaultMessage: string

  constructor() {
    this.defaultMessage = trans('app.default.success');
  }

  public success = (message: string, data?: any): response => {

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

  public error = (message: string, data?: any ): response => {
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

  public list = (message: string, count: number, data: any, page?: number): responseList => {

    const totalPage: number = getTotalPage(count);
    const response: responseList = {
      status: 0,
      message,
      page,
      count,
      totalPage,
      data: data
    };

    return response;
  };
}

export default ResponseStructure;