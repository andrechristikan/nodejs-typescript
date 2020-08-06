import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

class ErrorHandler {
    public handler = async (
        err: ErrorRequestHandler,
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const apiErrorResponse: apiErrorResponse = err as any;
        const response: finalErrorResponse = {
            code: apiErrorResponse.code,
            message: apiErrorResponse.info,
        };

        if (apiErrorResponse.errors) {
            response.errors = apiErrorResponse.errors;
        }

        res.status(apiErrorResponse.httpCode).json(response);
    };
}

export default ErrorHandler;
export const { handler } = new ErrorHandler();
