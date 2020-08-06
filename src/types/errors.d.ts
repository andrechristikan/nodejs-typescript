type rawErrorMessage = { code: number; field: string };
type errorMessage = { httpCode: number; message: string };
type detailErrorMessage = { code: number; field: string; message: string };

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
    HttpSuccessStatusCode: {
        OK: number;
        CREATED: number;
    };
    SystemErrorCode: any;
};

declare class APIError {
    constructor(code: number, errors?: Array<object>);
}

declare class BaseError {
    constructor(
        code: number,
        httpCode: number,
        info: string,
        errors?: Array<object>
    );
}
