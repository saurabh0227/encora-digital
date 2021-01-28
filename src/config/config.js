require('dotenv-safe').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'local',
  MONGO_URI: process.env.MONGO_URI,
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '4234567h',
  JWT_ENCRYPTION: process.env.JWT_ENCRYPTION || 'jwt_please_change',
};
