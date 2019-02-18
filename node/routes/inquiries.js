var express = require('express');
var router = express.Router();
var Inquiry = require('../database/models/inquiry');

// Post new inquiry
router.post('/', (req, res) => {
    var inquiry_id = req.body.inquiry_id;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var gender = req.body.gender;
    var NIN = req.body.NIN;
    var type = req.body.type;

    var new_inquiry = new Inquiry({
        inquiry_id: inquiry_id,
        first_name: first_name,
        last_name: last_name,
        gender: gender,
        NIN: NIN,
        type: type
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

// Fetch all inquiries
router.get('/', ({}, res) => {
    Inquiry.find({}, function (error, inquiries) {
        if (error) { console.error(error); }
        res.send({
            inquiries: inquiries
        })
    // The newest inquiry will be the last object in the fetched array
    }).sort({_id:1}) 
});   

module.exports = router;