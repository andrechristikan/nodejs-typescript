import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

class ErrorHandler {
    public handler = (
        err: ErrorRequestHandler,
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const errorResponse = err as any;
        const response: errorResponse = {
            code: errorResponse.code,
            message: errorResponse.info,
        };

        if (errorResponse.errors) {
            response.errors = errorResponse.errors;
        }
        console.log("errorResponse", errorResponse);
        res.status(errorResponse.httpCode).json(response);
    };
}

export default ErrorHandler;
export const { handler } = new ErrorHandler();
