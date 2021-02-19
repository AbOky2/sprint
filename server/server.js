const express = require('express');
const session = require('express-session');
const mongoSessionStore = require('connect-mongo');
const next = require('next');
const mongoose = require('mongoose');
const compression = require('compression');
const helmet = require('helmet');
const {
  MONGO_URL,
  PORT,
  dev,
  SESSION_NAME,
  COOKIE_DOMAIN,
  SESSION_SECRET,
  ROOT_URL,
} = require('../config');
const auth = require('./basic');
const api = require('./api');
const readMba = require('./utils/mba');
const logger = require('./logs');
// const { insertTemplates } = require('./models/EmailTemplate');
const routesWithSlug = require('./routesWithSlug');

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};
mongoose.connect(MONGO_URL, options);
const URL_MAP = {
  '/login': '/public/login',
};
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const server = express();
  // readMba();
  server.use(helmet({ contentSecurityPolicy: false }));
  server.use(compression());
  server.use(express.json());

  // give all Nextjs's request to Nextjs server
  server.get('/_next/*', (req, res) => {
    handle(req, res);
  });

  const MongoStore = mongoSessionStore(session);
  const sess = {
    name: SESSION_NAME,
    secret: SESSION_SECRET,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 14 * 24 * 60 * 60, // expires in 14 days
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 14 * 24 * 60 * 60 * 1000, // expires in 14 days
    },
  };

  // if (!dev) {
  //   server.set('trust proxy', 1); // sets req.hostname, req.ip
  //   sess.cookie.secure = true; // sets cookie over HTTPS only
  //   sess.cookie.domain = COOKIE_DOMAIN; // sets domain for production env
  // }

  server.use(session(sess));

  // await insertTemplates();

  auth({ server, ROOT_URL });
  api(server);
  routesWithSlug({ server, app });

  server.get('*', (req, res) => {
    const url = URL_MAP[req.path];
    if (url) {
      app.render(req, res, url);
    } else {
      handle(req, res);
    }
  });

  server.listen(PORT, (err) => {
    if (err) throw err;
    logger.info(`> Ready on ${ROOT_URL}`);
  });
});
