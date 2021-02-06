const dotenv = require('dotenv');

dotenv.config();

const {
  JWT_SECRET,
  NODE_ENV,
  MONGO_URL_TEST,
  MONGO_URL_PROD,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
} = process.env;

const PORT = process.env.PORT || 5000;
const ROOT_URL = process.env.ROOT_URL || `http://localhost:${PORT}`;
const SESSION_SECRET = process.env.SESSION_SECRET || 'M87kjdsfs876d98hdshhfjsecret';
const IS_PROD = NODE_ENV === 'production';
const IS_DEV = !IS_PROD;
const MONGO_URL = IS_DEV ? MONGO_URL_TEST : MONGO_URL_PROD;

module.exports = {
  PORT,
  ROOT_URL,
  MONGO_URL,
  JWT_SECRET,
  IS_DEV,
  IS_PROD,
  SESSION_SECRET,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
};
