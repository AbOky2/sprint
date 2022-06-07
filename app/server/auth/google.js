const passport = require('passport');
const Strategy = require('passport-google-oauth').OAuth2Strategy;
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const { UserModel } = require('../models');
// const { redirecAfterAuth } = require('./index');
const {
  storeSignUpInfos,
  consumeSignUpInfos,
} = require('../middleware/express');

function auth({ ROOT_URL, server }) {
  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UserModel.getById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  server.use(passport.initialize());
  server.use(passport.session());

  server.post('/auth/google', async (req, res) => {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    const { email, picture, name } = ticket.getPayload();

    const user = await UserModel.signInOrSignUpViaSocialMedia({
      provider: 'google',
      email,
      firstName: name,
      avatarUrl: picture,
    });
    res.status(201);
    res.json({ user });
  });

  server.get(
    '/oauth2callback',
    passport.authenticate('google', {
      failureRedirect: '/login',
    }),
    consumeSignUpInfos,
    (req, res) => {
      res.json({ user: req.user });
    }
  );
}

module.exports = auth;
