import jwt from 'jsonwebtoken';
import cryptoJS from 'crypto-js';
import userModel, { UserBaseInterface } from '../user/UserModel';
import countryModel from '../country/CountryModel';

class AuthService {
    public verifyToken = async (
        token: string,
        audience?: string | Array<string>
    ) => {
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
                (err: any, user: any) => {
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
    ) => {
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

    public hashPassword = async (passwordString: string) => {
        return new Promise((resolve, reject) => {
            const passwordHashed = cryptoJS.HmacSHA512(
                passwordString,
                config('auth.password.salt')
            );
            const passwordHashedBase64 = passwordHashed.toString(
                cryptoJS.enc.Base64
            );
            resolve(passwordHashedBase64);
        });
    };

    public comparePassword = async (
        passwordString: string,
        passwordHashed: string
    ) => {
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

    public signUp = async (data: signUp) => {
        const country = new Promise(async (resolve, reject) => {
            const countyCode = await countryModel.findById(data.countryId);
            const userData = data;
            userData.countryId = countyCode._id;
            resolve(userData);
        });

        return new Promise(async (resolve, reject) => {
            Promise.all([
                country,
                this.signUpValidation(
                    data.email as string,
                    data.mobileNumber as string
                ),
            ])
                .then(([userData, validationResult]) => {
                    const newUser = new userModel(data);
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

    public signUpValidation = (email: string, mobileNumber: string) => {
        return new Promise(async (resolve, reject) => {
            const userEmail = await userModel.findOne({
                email: email,
            });
            const userMobile = await userModel.findOne({
                mobileNumber: mobileNumber,
            });

            const validated = [];
            if (userMobile) {
                validated.push({
                    code: Enum.SystemErrorCode.USER_MOBILE_NUMBER_EXIST,
                });
            } else if (userEmail) {
                validated.push({
                    code: Enum.SystemErrorCode.USER_EMAIL_EXIST,
                });
            }

            if (!validated.length) {
                reject(
                    new APIError(Enum.SystemErrorCode.USER_NOT_FOUND, validated)
                );
            }

            resolve(true);
        });
    };

    public login = async (data: login) => {
        return new Promise(async (resolve, reject) => {
            const email: string = data.email.toLowerCase();

            const user = await userModel.findOne({ email: email });
            if (!user) {
                reject(new APIError(Enum.SystemErrorCode.USER_NOT_FOUND));
            }

            console.log(user.id);
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
} = new AuthService();
