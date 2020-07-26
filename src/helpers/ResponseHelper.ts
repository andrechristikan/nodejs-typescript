import { getTotalPage } from './ListHelper';

class ResponseHelper {
    private defaultMessage: string;

    constructor() {
        this.run();
    }

    private run = (): void => {
        this.defaultMessage = trans('app.default.success');
    };

    public success = (message: string, data?: any): responseStructure => {
        if (data !== null) {
            const response: responseStructure = {
                status: 0,
                message: message || this.defaultMessage,
                data: data,
            };
            return response;
        }

        const response: responseStructure = {
            status: 0,
            message: message || this.defaultMessage,
        };

        return response;
    };

    public error = (message: string, data?: any): responseStructure => {
        if (data !== null) {
            const response: responseStructure = {
                status: 1,
                message: message || this.defaultMessage,
                data: data,
            };
            return response;
        }

        const response: responseStructure = {
            status: 1,
            message: message || this.defaultMessage,
        };

        return response;
    };

    public list = (
        message: string,
        count: number,
        data: any,
        page?: number
    ): responseListStructure => {
        const totalPage: number = getTotalPage(count);
        const response: responseListStructure = {
            status: 0,
            message,
            page,
            count,
            totalPage,
            data: data,
        };

        return response;
    };
}

export const { success, error, list } = new ResponseHelper();
export default ResponseHelper;
