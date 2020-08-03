import { Request, Response, NextFunction } from 'express';
import { generateAccessToken } from './AuthService';

class AuthController {
    public login = (req: Request, res: Response, next: NextFunction) => {
        const data = {
            username: req.body.username,
            password: req.body.password,
        };
        generateAccessToken(data, req.get('host'))
            .then((token) => {
                const response = new APIResponse(
                    Enum.HttpSuccessStatusCode.OK,
                    language('auth.login.success'),
                    { token }
                );
                res.status(response.code).json(response);
            })
            .catch((err: any) => {
                next(new APIError(Enum.SystemErrorCode.INVALID_PASSWORD));
            });
    };
}

export default AuthController;
