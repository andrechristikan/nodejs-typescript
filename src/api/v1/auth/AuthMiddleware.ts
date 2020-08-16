import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from './AuthService';

class AuthMiddleware {
    public async isAuthenticated(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const authHeader: string = req.headers.authorization;
        
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            verifyAccessToken(token)
                .then((dataToken: dataToken) => {
                    const userLogged: string = dataToken.id;
                    req.user = userLogged;
                    next();
                })
                .catch((errToken: any) => {
                    next(
                        new APIError(
                            Enum.SystemErrorCode.INVALID_TOKEN
                        )
                    );
                });
        } else {
            next(new APIError(Enum.SystemErrorCode.TOKEN_REQUIRED));
        }

    }
}

export default AuthMiddleware;
