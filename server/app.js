const express = require('express');
const session = require('express-session');
const mongoSessionStore = require('connect-mongo');
const next = require('next');
const mongoose = require('mongoose');
const auth = require('./google');
const { IS_DEV, MONGO_URL, PORT, SESSION_SECRET, ROOT_URL } = require('../config');

mongoose.connect(MONGO_URL, { useNewUrlParser: true });

const app = next({ dev: IS_DEV });
const handle = app.getRequestHandler();

// Nextjs's server prepared
app.prepare().then(() => {
  const server = express();

  // confuring MongoDB session store
  const MongoStore = mongoSessionStore(session);
  const sess = {
    name: 'kit-le-nid.sid',
    secret: SESSION_SECRET,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 14 * 24 * 60 * 60, // save session 14 days
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 14 * 24 * 60 * 60 * 1000,
    },
  };

  server.use(session(sess));

  auth({ server, ROOT_URL });

  server.get('*', (req, res) => handle(req, res));

  // starting express server
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on ${ROOT_URL}`); // eslint-disable-line no-console
  });
});
