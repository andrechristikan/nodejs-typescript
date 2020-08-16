import { SystemErrorCode } from './Enum';
import { setErrorMessage, setDetailErrorMessage } from './ErrorMessage';
class APIError {
    constructor(code: SystemErrorCode, errors?: Array<rawErrorMessage>) {
        // ? Switch case
        const response: errorMessage = setErrorMessage(code);
        if (errors && errors.length > 0) {
            errors = setDetailErrorMessage(errors);
        }

        return new BaseError(code, response.httpCode, response.message, errors);
    }
}

export default APIError;
