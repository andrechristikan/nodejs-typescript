import { SystemErrorCode } from './Enum';

class APIError {
    constructor(code: SystemErrorCode, errors?: object | Array<object>) {
        // ? Switch case
        let response;
        switch (code) {
            // ! Login
            case Enum.SystemErrorCode.INVALID_EMAIL:
                response = {
                    httpCode: Enum.HttpErrorStatusCode.BAD_REQUEST,
                    message: language('_core.error.badRequest'),
                };
                break;
            case Enum.SystemErrorCode.USER_NOT_FOUND:
                response = {
                    httpCode: Enum.HttpErrorStatusCode.BAD_REQUEST,
                    message: language('_core.error.badRequest'),
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
                    message: language('auth.isAuthenticated.tokenRequired'),
                };
                break;
            case Enum.SystemErrorCode.INVALID_TOKEN:
                response = {
                    httpCode: Enum.HttpErrorStatusCode.BAD_REQUEST,
                    message: language('auth.isAuthenticated.invalidToken'),
                };
                break;
            case Enum.SystemErrorCode.TOKEN_GENERATE_FAILED:
                response = {
                    httpCode: Enum.HttpErrorStatusCode.INTERNAL_SERVER_ERROR,
                    message: language('auth.isAuthenticated.tokenGenerateFailed'),
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
