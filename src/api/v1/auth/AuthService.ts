import jwt from 'jsonwebtoken';
import cryptoJS from 'crypto-js';

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
}

export default AuthService;
export const {
    verifyToken,
    generateAccessToken,
    hashPassword,
    comparePassword,
} = new AuthService();
