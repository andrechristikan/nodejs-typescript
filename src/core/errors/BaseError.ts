import { HttpErrorStatusCode } from './Enum';

class BaseError extends Error {
    public readonly code: number;
    public readonly httpCode: HttpErrorStatusCode;
    public readonly info: string;
    public readonly errors: Array<object>;

    constructor(
        code: number,
        httpCode: HttpErrorStatusCode,
        info: string,
        errors?: Array<object>
    ) {
        super(`${code}`);

        this.code = code;
        this.httpCode = httpCode;
        this.info = info;
        if (errors) {
            this.errors = errors;
        }

        Error.captureStackTrace(this);
    }
}

export default BaseError;
