export default {
    resave: true,
    saveUninitialized: true,
    secret: env('SESSION_KEY'),
    name: env('NAME'),
    maxAge: env('SESSION_EXPIRED') * 60 * 1000
};