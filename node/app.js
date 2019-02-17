var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var db = require('./database/db'); 
var Inquiry = require('./database/models/inquiry');

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

db.setUpDB();

// Add new inquiry
app.post('/inquiries', (req, res) => {
    var db = req.db;
    var inquiry_id = req.body.inquiry_id;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var gender = req.body.gender;
    var NIN = req.body.NIN;
    var detail1 = req.body.detail1;
    var detail2 = req.body.detail2;

    var new_inquiry = new Inquiry({
        inquiry_id: inquiry_id,
        first_name: first_name,
        last_name: last_name,
        gender: gender,
        NIN: NIN,
        detail1: detail1,
        detail2: detail2
    })

    new_inquiry.save(function (error) {
        if (error) {
        console.log(error)
        }
        res.send({
        success: true,
        message: 'Inquiry saved successfully!'
        })
    })
});

module.exports = app;
