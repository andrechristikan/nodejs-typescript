import jwt from 'jsonwebtoken';
import cryptoJS from 'crypto-js';
import userModel from '../user/UserModel';
import { UserBaseInterface, UserDocument } from '../user/UserInterface';
import { getById as countryGetById } from '../country/CountryService';

class AuthService {
    public verifyToken = async (
        token: string,
        audience?: string | Array<string>
    ): Promise<object> => {
        return new Promise((resolve, reject) => {
            const options = {
                algorithm: config('auth.jwt.algorithm'),
                expiresIn: config('auth.jwt.expiresIn'),
                maxAge: config('auth.jwt.maxAge'),
                audience: audience,
            };
            jwt.verify(
                token,
                config('auth.jwt.secret'),
                options,
                (err: any, user: object) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(user);
                }
            );
        });
    };

    public generateAccessToken = async (
        data: object,
        audience?: string | Array<string>
    ): Promise<string> => {
        return new Promise((resolve, reject) => {
            const options = {
                algorithm: config('auth.jwt.algorithm'),
                expiresIn: config('auth.jwt.expiresIn'),
                audience: audience,
            };
            jwt.sign(
                data,
                config('auth.jwt.secret'),
                options,
                (err: any, token: string) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(token);
                }
            );
        });
    };

    public hashPassword = async (passwordString: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            const passwordHashed: cryptoJS.WordArray = cryptoJS.HmacSHA512(
                passwordString,
                config('auth.password.salt')
            );
            const passwordHashedBase64: string = passwordHashed.toString(
                cryptoJS.enc.Base64
            );
            resolve(passwordHashedBase64);
        });
    };

    public comparePassword = async (
        passwordString: string,
        passwordHashed: string
    ): Promise<Boolean> => {
        return new Promise((resolve, reject) => {
            this.hashPassword(passwordString)
                .then((passwordHashedBase64) => {
                    if (passwordHashedBase64 !== passwordHashed) {
                        resolve(false);
                    }
                    resolve(true);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };

    public signUp = async (data: signUp): Promise<UserBaseInterface> => {
        return new Promise(async (resolve, reject) => {
            Promise.all([
                countryGetById(data.countryId),
                this.signUpValidation(
                    data.email as string,
                    data.mobileNumber as string
                ),
            ])
                .then(([countyCode, validationResult]) => {
                    data.countryId = countyCode._id;
                    const newUser: UserDocument = new userModel(data);
                    newUser.save((err, user: UserBaseInterface) => {
                        if (err) {
                            reject(
                                new APIError(
                                    Enum.SystemErrorCode.SIGN_UP_FAILED
                                )
                            );
                        }

                        resolve(user);
                    });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };

    public getByEmail = async (email: string): Promise<UserBaseInterface> => {
        return new Promise((resolve, reject) => {
            userModel
                .findOne({
                    email: email.toLowerCase(),
                })
                .exec((err: any, user: UserBaseInterface) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(user);
                });
        });
    };

    public getByMobileNumber = async (
        mobileNumber: string
    ): Promise<UserBaseInterface> => {
        return new Promise((resolve, reject) => {
            userModel
                .findOne({
                    mobileNumber: mobileNumber,
                })
                .exec((err: any, user: UserBaseInterface) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(user);
                });
        });
    };

    public signUpValidation = async (
        email: string,
        mobileNumber: string
    ): Promise<Boolean> => {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getByEmail(email),
                this.getByMobileNumber(mobileNumber),
            ])
                .then(([userEmail, userMobile]) => {
                    const validated: Array<rawErrorMessage> = [];
                    if (userMobile) {
                        validated.push({
                            code: Enum.SystemErrorCode.USER_MOBILE_NUMBER_EXIST,
                            field: 'mobileNumber',
                        });
                    }
                    if (userEmail) {
                        validated.push({
                            code: Enum.SystemErrorCode.USER_EMAIL_EXIST,
                            field: 'email',
                        });
                    }
                    if (validated.length > 0) {
                        reject(
                            new APIError(
                                Enum.SystemErrorCode.SIGN_UP_FAILED,
                                validated
                            )
                        );
                    }

                    resolve(true);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };

    public login = async (data: login) => {
        return new Promise(async (resolve, reject) => {
            const email: string = data.email.toLowerCase();

            const user = await userModel.findOne({ email: email });
            if (!user) {
                reject(new APIError(Enum.SystemErrorCode.USER_NOT_FOUND));
            }

            resolve(user);
            // this.generateAccessToken(data, user.id)
            //     .then((token) => {
            //         const response = new APIResponse(
            //             Enum.HttpSuccessStatusCode.OK,
            //             language('auth.login.success'),
            //             { token }
            //         );
            //         res.status(response.code).json(response);
            //     })
            //     .catch((err: any) => {
            //         next(new APIError(Enum.SystemErrorCode.LOGIN_FAILED));
            //     });
        });
    };
}

export default AuthService;
export const {
    verifyToken,
    generateAccessToken,
    hashPassword,
    comparePassword,
    signUp,
    login,
    getByMobileNumber,
    getByEmail,
} = new AuthService();
