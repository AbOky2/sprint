const session = require('express-session');
// const toobusy = require('toobusy-js');
const mongoose = require('mongoose');
const mongoSessionStore = require('connect-mongo');
const compression = require('compression');
const helmet = require('helmet');
const { SESSION_SECRET, SESSION_NAME, COOKIE_DOMAIN } = require('../../config');

module.exports = (server, express) => {
  const limit = '1kb';
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
  // const server2Busy = (req, res, next) =>
  //   toobusy() ? res.send(503, 'Server Too Busy') : next();

  // if (!dev) {
  //   server.set('trust proxy', 1); // sets req.hostname, req.ip
  //   sess.cookie.secure = true; // sets cookie over HTTPS only
  //   sess.cookie.domain = COOKIE_DOMAIN; // sets domain for production env
  // }

  return [
    // server2Busy,
    helmet({ contentSecurityPolicy: false }),
    compression(),
    express.urlencoded({ extended: true, limit }),
    express.json({ limit }),
    session(sess),
  ];
};
