export default {
    origin: ['*'],
    method: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    maxAge: 600, // 10 mins, 1 = a minute
};
