export default {
  origin: ['*'],
  method: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  maxAge: 31557600000,
};