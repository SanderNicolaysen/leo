// Required for async/await, and other ES2015+ features
import '@babel/polyfill';

// Load enviroment variables
require('dotenv').config();
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
console.log(`Running in environment: ${process.env.NODE_ENV}`);

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

const dbConnection = db.init().then((connection) => {
  return connection;
});

const store = MongoStore(session);
const sessionMiddleware = session({ secret: 'prosjekt leo', resave: false, saveUninitialized: false, store: new store({ dbPromise: dbConnection }) });

app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));

// Use auth() as middleware for routes that require a logged in user
import auth from './middleware/auth';
import rtInquiry from './middleware/rtinquiry';

// handler for the /user/:id path, which prints the user ID
app.use('/api/dashboard', auth(), require('./routes/dashboard'));
app.use('/api/inquiries', require('./routes/inquiries'), rtInquiry(io));
app.use('/api/faqs', require('./routes/faqs'));
app.use('/api/forms', require('./routes/forms'));
app.use('/api/booths', require('./routes/booths'));
app.use('/api/appointments', require('./routes/appointments.js'));
app.use('/api/priorities/', auth(), require('./routes/priorities'));
app.use('/', require('./routes/auth'));

if (process.env.NODE_ENV === 'production') {
  http.listen('80');
} else {
  http.listen('8081');
}

io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});

require('./socketio/booth').update(io);
require('./socketio/queuenumberDisplay').updateQueueNumberDisplay(io);
require('./socketio/dashboard').register(io);

console.log('Listening on port 8081');

module.exports = app;
