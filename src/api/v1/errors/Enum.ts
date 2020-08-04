export enum SystemErrorCode {
    // ? Login
    LOGIN_FAILED = 1001,
    INVALID_PASSWORD = 1003,
    TOKEN_REQUIRED = 1004,
    INVALID_TOKEN = 1005,
    TOKEN_GENERATE_FAILED = 1006,

    // ? Sign up
    SIGN_UP_FAILED = 1050,

    // ? User
    USER_NOT_FOUND = 1100,
    USER_MOBILE_NUMBER_EXIST = 1101,
    USER_EMAIL_EXIST = 1101,

    // ? System
    PAGE_NOT_FOUND = 5001,

    // ? General
    GENERAL_ERROR = 10000,
}
