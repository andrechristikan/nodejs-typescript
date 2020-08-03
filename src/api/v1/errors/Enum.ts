export enum SystemErrorCode {
    // ? Login
    INVALID_EMAIL = 1001,
    USER_NOT_FOUND = 1002,
    INVALID_PASSWORD = 1003,
    TOKEN_REQUIRED = 1004,
    INVALID_TOKEN = 1005,
    TOKEN_GENERATE_FAILED = 1006,

    // ? System
    PAGE_NOT_FOUND = 5001,

    // ? General
    GENERAL_ERROR = 10000,
}
