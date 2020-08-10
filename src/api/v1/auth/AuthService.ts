import jwt from 'jsonwebtoken';
import cryptoJS from 'crypto-js';
import { getByMobileNumber as userGetByMobileNumber , getByEmail as userGetByEmail, store as userStore } from '../user/UserService';
import { UserBaseInterface } from '../user/UserInterface';

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
                this.signUpValidation(
                    data.email as string,
                    data.mobileNumber as string
                ),
            ])
                .then(([validationResult]) => {
                    userStore(data).then( (user: UserBaseInterface) => {
                        resolve(user);
                    }).catch( (errUserStore) => {
                        
                        reject(errUserStore);
                    });
                })
                .catch((errValidation) => {
                    reject(errValidation);
                });
        });
    };

    public signUpValidation = async (
        email: string,
        mobileNumber: string
    ): Promise<Boolean> => {
        return new Promise((resolve, reject) => {
            Promise.all([
                userGetByEmail(email),
                userGetByMobileNumber(mobileNumber),
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
            // const email: string = data.email.toLowerCase();

            // const user = await userModel.findOne({ email: email });
            // if (!user) {
            //     reject(new APIError(Enum.SystemErrorCode.USER_NOT_FOUND));
            // }

            resolve({});
            // this.{generateAccessToken}(data, user.id)
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
    signUpValidation
} = new AuthService();
