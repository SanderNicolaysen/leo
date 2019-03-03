import express from 'express';
import session from 'express-session';
import path from 'path';
import logger from 'morgan';
import cors from 'cors';
import db from './database/db';

import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from './database/models/user';

passport.use(new LocalStrategy.Strategy(
  function(username, password, done) {
    console.log(username, password);
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  console.log('serialize '+ user);
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  console.log('deserialize '+ id);
  User.findById(id, function (err, user) {
    if (err) { return done(err); }
    done(null, user);
  });
});

import inquiriesRouter from './routes/inquiries';
import faqsRouter from './routes/faqs';
import formsRouter from './routes/forms';

const app = express();
app.use(express.static(path.join(__dirname, '/../public/')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'prosjekt leo', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(cors()); // Enable cross domain requests for development in seperate environments

app.use('/api/inquiries', isLoggedIn, inquiriesRouter);
app.use('/api/faqs', faqsRouter);
app.use('/api/forms', formsRouter);

app.post('/login', passport.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.status(400).json({
    'message': 'access denied'
  });
}

app.listen('8081');

console.log('Listening on port 8081');

db.setUpDB();

module.exports = app;
