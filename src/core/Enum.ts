export enum HttpErrorStatusCode {
    MOVED_PERMANENTLY = 301,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    NOT_ACCEPTABLE = 406,
    REQUEST_TIMEOUT = 408,
    UNSUPPORTED_MEDIA_TYPE = 415,
    TOO_MANY_REQUESTS = 429,
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
}

export enum SystemErrorCode {
    // ? Login
    INVALID_EMAIL = 1001,
    USER_NOT_FOUND = 1002,
    INVALID_PASSWORD = 1003,

    // ? System
    PAGE_NOT_FOUND = 5001,

    // ? General
    GENERAL_ERROR = 10000,
}

export enum HttpSuccessStatusCode {
    OK = 200,
    CREATED = 201,
}