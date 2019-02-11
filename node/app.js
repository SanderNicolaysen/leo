var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var testRouter = require('./routes/test');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Enable cross domain requests for development in seperate environments
app.use(cors());

app.use('/api/test', testRouter);

app.listen('8081');

console.log('Listening on port 8081');

module.exports = app;
