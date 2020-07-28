import { SystemErrorCode } from './Enum';

class APIError extends Error {
    public readonly code: SystemErrorCode;
    public readonly description: string;
    public readonly data: any;

    constructor(
        code: SystemErrorCode,
        description: string,
        data: any = null
    ) {
        super(description);

        this.code = code;
        this.description = description;
        if(data){
            this.data = data;
        }

        Error.captureStackTrace(this);
    }
}

export default APIError;