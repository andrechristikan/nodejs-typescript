/** Makes a string harder to read. */

declare function env(key: string): string;

declare function config(key: string): any;

declare function trans(key: string): string;

declare function getVersion(): string;

declare function getError(): string;

declare const Enum: Enum;

declare class APIError {
    constructor(code: number, data?: any);
}

declare class APIResponse {
    constructor(code: number, message: string, data?: any, count?: number, page?: number);
}

declare const logger: any;

type Enum = {
    HttpErrorStatusCode: {
        MOVED_PERMANENTLY: number;
        BAD_REQUEST: number;
        UNAUTHORIZED: number;
        FORBIDDEN: number;
        NOT_FOUND: number;
        METHOD_NOT_ALLOWED: number;
        NOT_ACCEPTABLE: number;
        REQUEST_TIMEOUT: number;
        UNSUPPORTED_MEDIA_TYPE: number;
        TOO_MANY_REQUESTS: number;
        INTERNAL_SERVER_ERROR: number;
        NOT_IMPLEMENTED: number;
        BAD_GATEWAY: number;
        SERVICE_UNAVAILABLE: number;
    };
    SystemErrorCode: {
        INVALID_EMAIL: number;
        USER_NOT_FOUND: number;
        INVALID_PASSWORD: number;
        GENERAL_ERROR: number;
        PAGE_NOT_FOUND: number;
    };
    HttpSuccessStatusCode: {
        OK: number;
        CREATED: number;
    };
};

type errorResponse = {
    code: number;
    message: string;
    errors?: object;
};

type successResponse = {
    code: number;
    message: string;
    count?: number;
    page?: number;
    data?: any;
};

type log = {
    rules: {
        path: string;
        size: string;
        maxSize: string;
        compress: boolean;
        interval: string;
    };
    name: string;
    routes: Array<string>;
    includes: Array<string>;
};
