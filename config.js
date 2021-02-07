const dotenv = require('dotenv');

dotenv.config();

const {
  JWT_SECRET,
  NODE_ENV,
  MONGO_URL_TEST,
  MONGO_URL_PROD,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  SESSION_NAME,
  COOKIE_DOMAIN
} = process.env;

const PORT = process.env.PORT || 3000;
const ROOT_URL = process.env.ROOT_URL || `http://localhost:${PORT}`;
const SESSION_SECRET = process.env.SESSION_SECRET || 'M87kjdsfs876d98hdshhfjsecret';
const dev = NODE_ENV !== 'production';
const MONGO_URL = dev ? MONGO_URL_TEST : MONGO_URL_PROD;

module.exports = {
  PORT,
  ROOT_URL,
  NEXT_PUBLIC_PORT: PORT,
  MONGO_URL,
  JWT_SECRET,
  dev,
  SESSION_NAME,
  SESSION_SECRET,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  COOKIE_DOMAIN,
};
