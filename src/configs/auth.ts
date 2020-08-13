export default {
    username: 'email',
    password: {
        salt: 'gTQxq251q3Ewqw14qe1',
    },
    jwt: {
        access: {
            secret: env('JWT_ACCESS_TOKEN_SECRET'),
            algorithm: 'HS256',
            expiresIn: env('JWT_ACCESS_TOKEN_LIFE'),
        },
        refresh: {
            secret: env('JWT_REFRESH_TOKEN_SECRET'),
            algorithm: 'HS256',
            expiresIn: env('JWT_REFRESH_TOKEN_LIFE'),
        }
    },
};
