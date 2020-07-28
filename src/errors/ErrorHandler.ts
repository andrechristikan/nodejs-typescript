import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

class ErrorHandler {
    public handler = (
        err: ErrorRequestHandler,
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        res.status(500).json({ error: err });
    };
}

export default ErrorHandler;
export const { handler } = new ErrorHandler();
