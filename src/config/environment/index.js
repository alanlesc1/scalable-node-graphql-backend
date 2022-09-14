import dotenv from 'dotenv';

dotenv.config();

// Boolean value
const nodeEnv = {
  development: process.env.NODE_ENV === 'development',
  test: process.env.NODE_ENV === 'test',
  staging: process.env.NODE_ENV === 'staging',
  production: process.env.NODE_ENV === 'production',
};

const serverPort = process.env.SERVER_PORT || 3000;

const jwtSecret = process.env.JWT_SECRET;

const emailHost = process.env.EMAIL_HOST;

const emailPort = process.env.EMAIL_PORT;

const emailAuthUser = process.env.EMAIL_AUTH_USER;

const emailAuthPassword = process.env.EMAIL_AUTH_PASSWORD;

export { nodeEnv, serverPort, jwtSecret, emailHost, emailPort, emailAuthUser, emailAuthPassword };
