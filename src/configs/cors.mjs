export default {
  origin: ["*"],
  method: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowed_header: ["Content-Type", "Authorization", "Accept"],
  max_age: 3600,
};
