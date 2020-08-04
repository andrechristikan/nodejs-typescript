import { Request, Response, NextFunction } from 'express';
import { signUp as signUpService, login as loginService } from './AuthService';
import { UserBaseInterface } from '../user/UserModel';

class AuthController {
    public login = async (req: Request, res: Response, next: NextFunction) => {
        const data: login = {
            email: req.body.email,
            password: req.body.password,
        };

        loginService(data)
            .then((result: object) => {
                const response = new APIResponse(
                    Enum.HttpSuccessStatusCode.OK,
                    language('auth.login.success'),
                    { ...result }
                );
                res.status(response.code).json(response);
            })
            .catch((err) => {
                next(err);
            });
    };

    public signUp = async (req: Request, res: Response, next: NextFunction) => {
        const data: signUp = {
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            mobileNumber: req.body.mobileNumber,
            countryId: req.body.countryId,
        };

        signUpService(data)
            .then((result: UserBaseInterface) => {
                const response = new APIResponse(
                    Enum.HttpSuccessStatusCode.OK,
                    language('auth.signUp.success')
                );
                res.status(response.code).json(response);
            })
            .catch((err) => {
                next(err);
            });
    };
}

export default AuthController;
