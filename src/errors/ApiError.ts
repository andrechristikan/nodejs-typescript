import { SystemErrorCode, HttpErrorStatusCode } from './Enum';

class APIError extends Error {
    public readonly code: SystemErrorCode;
    public readonly httpCode: HttpErrorStatusCode;
    public readonly info: string;
    public readonly errors: any;

    constructor(
        code: SystemErrorCode = Enum.SystemErrorCode.GENERAL_ERROR,
        errors: any = null
    ) {
        super(`${code}`);

        // ? Default message
        let httpError = this.setHttpError(code);

        this.code = code;
        this.httpCode = httpError.httpCode;
        this.info = httpError.message;
        if (errors) {
            this.errors = errors;
        }

        Error.captureStackTrace(this);
    }

    private setHttpError = (code: number) => {
        // ? Switch case
        switch (code) {
            // ! Login
            case Enum.SystemErrorCode.INVALID_EMAIL:
                return {
                    httpCode: Enum.HttpErrorStatusCode.BAD_REQUEST,
                    message: trans('error.badRequest'),
                };
            case Enum.SystemErrorCode.USER_NOT_FOUND:
                return {
                    httpCode: Enum.HttpErrorStatusCode.BAD_REQUEST,
                    message: trans('error.badRequest'),
                };
            case Enum.SystemErrorCode.INVALID_PASSWORD:
                return {
                    httpCode: Enum.HttpErrorStatusCode.BAD_REQUEST,
                    message: trans('error.badRequest'),
                };

            // ! System Error
            case Enum.SystemErrorCode.PAGE_NOT_FOUND:
                return {
                    httpCode: Enum.HttpErrorStatusCode.NOT_FOUND,
                    message: trans('error.notFound'),
                };

            // ! General Error
            case Enum.SystemErrorCode.GENERAL_ERROR:
                return {
                    httpCode: Enum.HttpErrorStatusCode.INTERNAL_SERVER_ERROR,
                    message: trans('error.internalServerError'),
                };
            default:
                return {
                    httpCode: Enum.HttpErrorStatusCode.INTERNAL_SERVER_ERROR,
                    message: trans('error.internalServerError'),
                };
        }
    };
}

export default APIError;
