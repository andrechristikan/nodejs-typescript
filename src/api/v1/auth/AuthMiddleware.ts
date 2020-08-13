import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from './AuthService';

class AuthMiddleware {
    public async isAuthenticated(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            verifyAccessToken(token, req.get('host'))
                .then((dataToken: dataToken) => {
                    next();
                })
                .catch((err: any) => {
                    next(new APIError(Enum.SystemErrorCode.INVALID_TOKEN));
                });
        } else {
            next(new APIError(Enum.SystemErrorCode.TOKEN_REQUIRED));
        }
    }
}

export default AuthMiddleware;
