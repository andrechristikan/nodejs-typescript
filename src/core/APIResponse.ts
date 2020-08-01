import { HttpSuccessStatusCode } from './Enum';

class APIResponse {
    constructor(
        code: HttpSuccessStatusCode,
        message: string,
        data?: any,
        count?: number,
        page?: number
    ) {
        const defaultPage: number = page;
        const defaultCount: number = count;
        const response: successResponse = {
            code: code,
            message: message,
        };

        if (data) {
            response.data = data;
        }

        if (count) {
            response.count = defaultCount;
        }

        if (page) {
            response.page = defaultPage;
        }

        return response;
    }
}

export default APIResponse;
