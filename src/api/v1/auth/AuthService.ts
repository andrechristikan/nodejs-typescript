import jwt, { SignOptions } from 'jsonwebtoken';
import cryptoJS from 'crypto-js';

class AuthService {
    public async verifyAccessToken(
        token: string,
        audience?: string | Array<string>
    ): Promise<object> {
        return new Promise((resolve, reject) => {
            const options: optionVerifyToken = {
                algorithm: config('auth.jwt.access.algorithm'),
                issuer: config('auth.issuer'),
            };
            if (audience) {
                options.audience = audience;
            }
            jwt.verify(
                token,
                config('auth.jwt.access.secret'),
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
            const options: optionGenerateToken = {
                algorithm: config('auth.jwt.access.algorithm'),
                expiresIn: config('auth.jwt.access.expiresIn'),
                issuer: config('auth.issuer'),
            };
            if (audience) {
                options.audience = audience;
            }
            jwt.sign(
                data,
                config('auth.jwt.access.secret'),
                options as SignOptions,
                (err: any, token: string) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(token);
                }
            );
        });
    }

    public async generateRefreshToken(
        data: dataToken,
        audience?: string | Array<string>
    ): Promise<string> {
        return new Promise((resolve, reject) => {
            const options: optionGenerateToken = {
                algorithm: config('auth.jwt.refresh.algorithm'),
                expiresIn: config('auth.jwt.refresh.expiresIn'),
                issuer: config('auth.issuer'),
            };
            if (audience) {
                options.audience = audience;
            }
            jwt.sign(
                data,
                config('auth.jwt.refresh.secret'),
                options as SignOptions,
                (err: any, token: string) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(token);
                }
            );
        });
    }

    public async decodeAccessToken(token: string): Promise<dataToken> {
        return new Promise((resolve, reject) => {
            resolve(jwt.decode(token) as dataToken);
        });
    }

    public async hashPassword(passwordString: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const passwordHashed: cryptoJS.WordArray = cryptoJS.HmacSHA512(
                passwordString,
                config('auth.password.salt')
            );
            const passwordDigest: string = passwordHashed.toString(
                cryptoJS.enc.Base64
            );
            resolve(passwordDigest);
        });
    }

    public async comparePassword(
        passwordString: string,
        passwordHashed: string
    ): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.hashPassword(passwordString)
                .then((passwordDigest: string) => {
                    if (passwordDigest !== passwordHashed) {
                        resolve(false);
                    }
                    resolve(true);
                })
                .catch((err: any) => {
                    reject(err);
                });
        });
    }
}

export default AuthService;
export const {
    verifyAccessToken,
    generateAccessToken,
    hashPassword,
    comparePassword,
    generateRefreshToken,
    decodeAccessToken,
} = new AuthService();
