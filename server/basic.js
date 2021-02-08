const passport = require('passport');
const { Strategy } = require('passport-local');
const { UserModel } = require('./models');
const msg = require('./utils/message');
const joiSchema = require('./middleware/schema');
const requestMiddleware = require('./middleware/request');

const signUpPath = '/auth/signup';
const signInPath = '/auth/signin';

const SignRequsts = [
  { path: signUpPath, schema: joiSchema.user.public.user.signUp },
  { path: signInPath, schema: joiSchema.user.public.user.signIn },
];

const auth = ({ server }) => {
  const verify = async (req, email, password, cb) => {
    const reqPath = req.path;
    const data = { ...req.body, email, password };

    let user = null;

    try {
      if (reqPath === signInPath) user = await UserModel.signIn(data);
      else if (reqPath === signUpPath) user = await UserModel.signUp(data);
      else throw msg.wrongInfo('path');

      cb(null, user);
    } catch (error) {
      const err = msg.convertHttpErrors(error);

      if (err.message) return cb(null, null, err);
      cb(err, null);
    }
  };

  passport.use(
    new Strategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      verify,
    ),
  );
  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UserModel.get(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  server.use(passport.initialize());
  server.use(passport.session());

  SignRequsts.forEach(({ path, schema }) =>
    server.post(path, requestMiddleware(schema), (req, res, next) => {
      passport.authenticate('local', (err, reqUser, info) => {
        if (err) return next(err);
        if (!reqUser) return res.status(401).json({ message: info.message });

        req.login(reqUser, (error) => {
          if (error) return next(error);

          res.json({ user: reqUser });
        });
      })(req, res, next);
    }),
  );
  server.get('/auth/logout', (req, res) => {
    req.logout();
    res.json({ success: 'sucess' });
  });
};

module.exports = auth;
