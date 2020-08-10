import { Request, Response, NextFunction } from 'express';
import {
    generateAccessToken as generateAccessTokenService,
    comparePassword as comparePasswordService,
    userExist as userExistService,
} from './AuthService';
import { UserBaseInterface, UserMiniInterface } from '../user/UserInterface';
import {
    store as userStoreService,
    getByEmail as userGetByEmailService,
    getById as userGetByIdService,
} from '../user/UserService';

class AuthController {
    public async login(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const data: login = {
            email: req.body.email,
            password: req.body.password,
        };

        userGetByEmailService(data.email)
            .then((checkEmail: UserMiniInterface) => {
                userGetByIdService(checkEmail.id)
                    .then((user: UserBaseInterface) => {
                        const dataToken: dataToken = {
                            id: user.id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            mobileNumber: user.mobileNumber,
                            mobileNumberCode: user.country.mobileNumberCode,
                            countryCode: user.country.countryCode,
                        };
                        Promise.all([
                            comparePasswordService(
                                data.password,
                                user.password
                            ),
                            generateAccessTokenService(dataToken, user.id),
                        ])
                            .then(([comparePassword, generateToken]) => {
                                if (!comparePassword) {
                                    next(
                                        new APIError(
                                            Enum.SystemErrorCode.INVALID_PASSWORD
                                        )
                                    );
                                }

                                const response = new APIResponse(
                                    Enum.HttpSuccessStatusCode.OK,
                                    language('auth.login.success'),
                                    { token: generateToken }
                                );
                                res.status(response.code).json(response);
                            })
                            .catch(() => {
                                next(
                                    new APIError(
                                        Enum.SystemErrorCode.LOGIN_FAILED
                                    )
                                );
                            });
                    })
                    .catch(() => {
                        next(new APIError(Enum.SystemErrorCode.USER_NOT_FOUND));
                    });
            })
            .catch(() => {
                next(new APIError(Enum.SystemErrorCode.USER_NOT_FOUND));
            });
    }

    public async signUp(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const data: signUp = {
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            mobileNumber: req.body.mobileNumber,
            country: req.body.country,
        };

        Promise.all([
            userExistService(
                data.email as string,
                data.mobileNumber as string
            ),
        ])
            .then(([existed]) => {
                if (existed.length > 0) {
                    next(
                        new APIError(
                            Enum.SystemErrorCode.SIGN_UP_FAILED,
                            existed
                        )
                    );
                }else{
                    userStoreService(data)
                        .then((user: UserBaseInterface) => {
                            const response = new APIResponse(
                                Enum.HttpSuccessStatusCode.CREATED,
                                language('auth.signUp.success')
                            );
                            res.status(response.code).json(response);
                        })
                        .catch((userStoreError) => {
                            next(userStoreError);
                        });
                }
            })
            .catch((signUpError) => {
                next(signUpError);
            });
    }
}

export default AuthController;
