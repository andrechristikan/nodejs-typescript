import { SystemErrorCode } from './Enum';

class APIError {
    constructor(code: SystemErrorCode, errors?: object | Array<object>) {
        // ? Switch case
        let response;
        switch (code) {
            // ! Login
            case Enum.SystemErrorCode.LOGIN_FAILED:
                response = {
                    httpCode: Enum.HttpErrorStatusCode.INTERNAL_SERVER_ERROR,
                    message: language('auth.login.failed'),
                };
                break;
            case Enum.SystemErrorCode.INVALID_PASSWORD:
                response = {
                    httpCode: Enum.HttpErrorStatusCode.BAD_REQUEST,
                    message: language('auth.login.invalidPassword'),
                };
                break;
            case Enum.SystemErrorCode.TOKEN_REQUIRED:
                response = {
                    httpCode: Enum.HttpErrorStatusCode.BAD_REQUEST,
                    message: language('auth.login.tokenRequired'),
                };
                break;
            case Enum.SystemErrorCode.INVALID_TOKEN:
                response = {
                    httpCode: Enum.HttpErrorStatusCode.BAD_REQUEST,
                    message: language('auth.login.invalidToken'),
                };
                break;
            case Enum.SystemErrorCode.TOKEN_GENERATE_FAILED:
                response = {
                    httpCode: Enum.HttpErrorStatusCode.INTERNAL_SERVER_ERROR,
                    message: language('auth.login.tokenGenerateFailed'),
                };
                break;

            // ! Sign up
            case Enum.SystemErrorCode.SIGN_UP_FAILED:
                response = {
                    httpCode: Enum.HttpErrorStatusCode.INTERNAL_SERVER_ERROR,
                    message: language('auth.signUp.failed'),
                };
                break;
                

            // ! User
            case Enum.SystemErrorCode.USER_NOT_FOUND:
                response = {
                    httpCode: Enum.HttpErrorStatusCode.BAD_REQUEST,
                    message: language('user.userNotFound'),
                };
                break;
            case Enum.SystemErrorCode.USER_MOBILE_NUMBER_EXIST:
                response = {
                    httpCode: Enum.HttpErrorStatusCode.BAD_REQUEST,
                    message: language('user.userMobileNumberExist'),
                };
                break;
            case Enum.SystemErrorCode.USER_EMAIL_EXIST:
                response = {
                    httpCode: Enum.HttpErrorStatusCode.BAD_REQUEST,
                    message: language('user.userEmailExist'),
                };
                break;
                
            // ! System Error
            case Enum.SystemErrorCode.PAGE_NOT_FOUND:
                response = {
                    httpCode: Enum.HttpErrorStatusCode.NOT_FOUND,
                    message: language('_core.error.notFound'),
                };
                break;

            // ! General Error
            case Enum.SystemErrorCode.GENERAL_ERROR:
                response = {
                    httpCode: Enum.HttpErrorStatusCode.INTERNAL_SERVER_ERROR,
                    message: language('_core.error.internalServerError'),
                };
                break;
            default:
                response = {
                    httpCode: Enum.HttpErrorStatusCode.INTERNAL_SERVER_ERROR,
                    message: language('_core.error.internalServerError'),
                };
                break;
        }

        return new BaseError(code, response.httpCode, response.message, errors);
    }
}

export default APIError;
