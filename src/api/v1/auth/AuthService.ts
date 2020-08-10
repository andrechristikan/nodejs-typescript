import jwt from 'jsonwebtoken';
import cryptoJS from 'crypto-js';
import {
    getByMobileNumber as userGetByMobileNumber,
    getByEmail as userGetByEmail,
} from '../user/UserService';

class AuthService {
    public async verifyToken(
        token: string,
        audience?: string | Array<string>
    ): Promise<object> {
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
    }

    public async generateAccessToken(
        data: dataToken,
        audience?: string | Array<string>
    ): Promise<string> {
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
    }

    public async hashPassword(passwordString: string): Promise<string> {
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
    }

    public async comparePassword(
        passwordString: string,
        passwordHashed: string
    ): Promise<boolean> {
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
    }

    public async userExist(
        email: string,
        mobileNumber: string
    ): Promise<Array<rawErrorMessage>> {
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

                    resolve(validated);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

}

export default AuthService;
export const {
    verifyToken,
    generateAccessToken,
    hashPassword,
    comparePassword,
    userExist,
} = new AuthService();
