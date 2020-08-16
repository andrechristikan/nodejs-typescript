export default {
    resave: true,
    saveUninitialized: true,
    secret: env('SESSION_SECRET') || '1234567890',
    name: 'sessionSecret',
    maxAge: 60 * 60 * 1000, // 1 hour
};
