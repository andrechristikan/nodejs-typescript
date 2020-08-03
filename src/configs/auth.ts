export default {
    saltRounds: 10,
    jwt: {
        secret: env('JWT_SECRET_TOKEN'),
        algorithm: 'HS256',
        expiresIn: env('JWT_EXPIRED_TOKEN'),
        maxAge: '7d',
    }
};
