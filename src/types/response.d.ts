declare class APIResponse {
    public code: number;
    constructor(
        code: number,
        message: string,
        data?: any,
        count?: number,
        page?: number
    );
}

type successResponse = {
    code: number;
    message: string;
    count?: number;
    page?: number;
    data?: any;
};

type finalErrorResponse = {
    code: number;
    message: string;
    errors?: object;
};

type apiErrorResponse = {
    code: number;
    httpCode: number;
    info: string;
    errors?: object;
};
