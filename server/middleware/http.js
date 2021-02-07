const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const { SESSION_SECRET } = require('../../config');
// const { UserModel } = require('../models');
// const { jwtVerify } = require('../utils/jwt');
// const msg = require('../utils/message');

module.exports = [
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json(),
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
  passport.initialize(),
  passport.session(),
  // (req, res, next) => {
  //   // check header or url parameters or post parameters for token
  //   let token = req.headers.authorization;
  //   const notLogedUserAcessPage = ['/auth/signin', '/auth/signup'];
  //   const publicApiV1 = '/api/v1/public';
  //   const { originalUrl } = req;

  //   if (notLogedUserAcessPage.includes(originalUrl)) return next();
  //   if (!token) return next(); // if no token, continue

  //   token = token.replace('Bearer ', '');

  //   jwtVerify(token, async (err, user) => {
  //     if (err) {
  //       if (originalUrl.startsWith(publicApiV1)) return next();

  //       return res.status(403).json({ success: false, message: msg.invalidToken });
  //     }

  //     if (user) {
  //       try {
  //         req.user = await UserModel.getById(user._id);
  //       } catch (error) {
  //         req.logout();
  //         req.session.destroy();
  //       }
  //     }
  //     next();
  //   });
  // },
];
