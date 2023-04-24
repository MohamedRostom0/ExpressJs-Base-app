import { config as parseEnvironmentVariables } from 'dotenv';

parseEnvironmentVariables();

export const config = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_URI: process.env.MONGO_URI,
};
