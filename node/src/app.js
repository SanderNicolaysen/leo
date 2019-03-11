// Required for async/await, and other ES2015+ features
import '@babel/polyfill';

import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import path from 'path';
import logger from 'morgan';
import db from './database/db';
import passport from './config/passport.config';

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const socket = require('./socket.js');
socket.booth(io);
socket.queueNumberDisplay(io);

var dbConnection = db.setUpDB().then(() => {
  return db.connection();
});

const store = MongoStore(session);

app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'prosjekt leo', resave: false, saveUninitialized: false, store: new store({ dbPromise: dbConnection }) }));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));

// Use auth() as middleware for routes that require a logged in user
import auth from './middleware/auth';
app.use('/api/dashboard', auth(), require('./routes/dashboard'));
app.use('/api/inquiries', require('./routes/inquiries'));
app.use('/api/faqs', require('./routes/faqs'));
app.use('/api/forms', require('./routes/forms'));
app.use('/api/appointments', require('./routes/appointments.js'));
app.use('/', require('./routes/auth'));

http.listen('8081');

console.log('Listening on port 8081');

module.exports = app;
