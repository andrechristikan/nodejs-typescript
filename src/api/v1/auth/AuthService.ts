import jwt from 'jsonwebtoken';

class AuthService {
    public authenticateToken = (
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
}

export default AuthService;
export const { authenticateToken, generateAccessToken } = new AuthService();
