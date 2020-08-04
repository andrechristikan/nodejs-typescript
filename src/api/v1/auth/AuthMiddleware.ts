import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './AuthService';

class AuthMiddleware {
    public isAuthenticated = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            verifyToken(token, req.get('host'))
                .then(() => {
                    next();
                })
                .catch((err: any) => {
                    next(new APIError(Enum.SystemErrorCode.INVALID_TOKEN));
                });
        } else {
            next(new APIError(Enum.SystemErrorCode.TOKEN_REQUIRED));
        }
    };
}

export default AuthMiddleware;
