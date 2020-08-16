import { Request, Response, NextFunction } from 'express';
import {
    generateAccessToken as generateAccessTokenService,
    generateRefreshToken as generateRefreshTokenService,
    comparePassword as comparePasswordService,
} from './AuthService';
import { UserMiniInterface, UserDocument } from '../user/UserInterface';
import {
    store as userStoreService,
    getByEmail as userGetByEmailService,
    getById as userGetByIdService,
    checkExist as userCheckExist,
    getPasswordById as userGetPasswordById,
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
                Promise.all([
                    userGetByIdService(checkEmail.id),
                    userGetPasswordById(checkEmail.id),
                ])
                    .then(([user, password]) => {
                        const dataToken: dataToken = {
                            id: user.id,
                            email: user.email,
                            mobileNumber: user.mobileNumber,
                        };

                        Promise.all([
                            comparePasswordService(data.password, password),
                            generateAccessTokenService(dataToken),
                            generateRefreshTokenService(dataToken),
                        ])
                            .then(
                                ([
                                    comparePassword,
                                    accessToken,
                                    refreshToken,
                                ]) => {
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
                                        {
                                            accessToken: accessToken,
                                            refreshToken: refreshToken,
                                        }
                                    );
                                    res.status(response.code).json(response);
                                }
                            )
                            .catch((err) => {
                                console.log(err);
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
                        .then((user: UserDocument) => {
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
