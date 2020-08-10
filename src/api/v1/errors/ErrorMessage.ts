import { SystemErrorCode } from './Enum';

class ErrorMessage {
    public setDetailErrorMessage = (
        errors: rawErrorMessage[]
    ): detailErrorMessage[] => {
        const newError: detailErrorMessage[] = [];
        errors.forEach((value: rawErrorMessage) => {
            const error: errorMessage = this.setErrorMessage(value.code);
            newError.push({
                ...value,
                message: error.message,
            });
        });
        return newError;
    };

    public setErrorMessage(code: SystemErrorCode): errorMessage {
        switch (code) {
            // ? FORM ERROR
            // ! LOGIN
            case Enum.SystemErrorCode.LOGIN_FAILED:
                return {
                    httpCode: Enum.HttpErrorStatusCode.BAD_REQUEST,
                    message: language('auth.login.failed'),
                };
            case Enum.SystemErrorCode.INVALID_PASSWORD:
                return {
                    httpCode: Enum.HttpErrorStatusCode.BAD_REQUEST,
                    message: language('auth.login.invalidPassword'),
                };
            case Enum.SystemErrorCode.TOKEN_REQUIRED:
                return {
                    httpCode: Enum.HttpErrorStatusCode.BAD_REQUEST,
                    message: language('auth.login.tokenRequired'),
                };
            case Enum.SystemErrorCode.INVALID_TOKEN:
                return {
                    httpCode: Enum.HttpErrorStatusCode.BAD_REQUEST,
                    message: language('auth.login.invalidToken'),
                };
            case Enum.SystemErrorCode.TOKEN_GENERATE_FAILED:
                return {
                    httpCode: Enum.HttpErrorStatusCode.INTERNAL_SERVER_ERROR,
                    message: language('auth.login.tokenGenerateFailed'),
                };

            // ! SIGN UP
            case Enum.SystemErrorCode.SIGN_UP_FAILED:
                return {
                    httpCode: Enum.HttpErrorStatusCode.BAD_REQUEST,
                    message: language('auth.signUp.failed'),
                };

            // ? FORM ERROR
            // ! USER
            case Enum.SystemErrorCode.USER_NOT_FOUND:
                return {
                    httpCode: Enum.HttpErrorStatusCode.BAD_REQUEST,
                    message: language('user.userNotFound'),
                };
            case Enum.SystemErrorCode.USER_MOBILE_NUMBER_EXIST:
                return {
                    httpCode: Enum.HttpErrorStatusCode.BAD_REQUEST,
                    message: language('user.userMobileNumberExist'),
                };
            case Enum.SystemErrorCode.USER_EMAIL_EXIST:
                return {
                    httpCode: Enum.HttpErrorStatusCode.BAD_REQUEST,
                    message: language('user.userEmailExist'),
                };

            // ? SYSTEM ERROR
            case Enum.SystemErrorCode.PAGE_NOT_FOUND:
                return {
                    httpCode: Enum.HttpErrorStatusCode.NOT_FOUND,
                    message: language('_core.error.notFound'),
                };

            // ? FATAL ERROR
            case Enum.SystemErrorCode.GENERAL_ERROR:
                return {
                    httpCode: Enum.HttpErrorStatusCode.INTERNAL_SERVER_ERROR,
                    message: language('_core.error.internalServerError'),
                };
            default:
                return {
                    httpCode: Enum.HttpErrorStatusCode.INTERNAL_SERVER_ERROR,
                    message: language('_core.error.internalServerError'),
                };
        }
    }
}

export default ErrorMessage;
export const { setErrorMessage, setDetailErrorMessage } = new ErrorMessage();
