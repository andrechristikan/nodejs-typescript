export default {
    username: env('LOGIN_USERNAME') || 'email',
    password: {
        salt: env('LOGIN_PASSWD_SALT') || '1234567890',
    },
    issuer: 'ac.k',
    jwt: {
        access: {
            secret: env('JWT_ACCESS_TOKEN_SECRET') || '1234567890',
            algorithm: 'HS256',
            expiresIn: env('JWT_ACCESS_TOKEN_LIFE') || 60000, // in a minute
        },
        refresh: {
            secret: env('JWT_REFRESH_TOKEN_SECRET') || '1234567890',
            algorithm: 'HS256',
            expiresIn: env('JWT_REFRESH_TOKEN_LIFE') || 3600000, // in a hour
        },
    },
};
