import { Request, Response, NextFunction } from 'express';
import {
    generateAccessToken as generateAccessTokenService,
    comparePassword as comparePasswordService,
} from './AuthService';
import { UserBaseInterface, UserMiniInterface } from '../user/UserInterface';
import {
    store as userStoreService,
    getByEmail as userGetByEmailService,
    getById as userGetByIdService,
    checkExist as userCheckExist,
} from '../user/UserService';
import { getById as countryGetById } from '../country/CountryService';

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
                                    language('auth.login.formSuccess'),
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
            country: req.body.country,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            mobileNumber: req.body.mobileNumber,
        };

        Promise.all([
            userCheckExist(data.email, data.mobileNumber),
            countryGetById(data.country),
        ])
            .then(([existed, country]) => {
                if (existed.length > 0) {
                    next(
                        new APIError(
                            Enum.SystemErrorCode.SIGN_UP_VALIDATION_FAILED,
                            existed
                        )
                    );
                } else if (!country) {
                    next(new APIError(Enum.SystemErrorCode.COUNTRY_NOT_FOUND));
                } else {
                    userStoreService(data)
                        .then((user: UserBaseInterface) => {
                            const response = new APIResponse(
                                Enum.HttpSuccessStatusCode.CREATED,
                                language('auth.signUp.formSuccess')
                            );
                            res.status(response.code).json(response);
                        })
                        .catch((userStoreError) => {
                            next(
                                new APIError(
                                    Enum.SystemErrorCode.SIGN_UP_FAILED
                                )
                            );
                        });
                }
            })
            .catch((signUpError) => {
                next(new APIError(Enum.SystemErrorCode.SIGN_UP_FAILED));
            });
    }
}

export default AuthController;
