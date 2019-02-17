var inquiries = require('./seeds/inquiries');
var mongoose = require('mongoose');
var Inquiry = require('./models/inquiry');

module.exports = {
  setUpDB: function() {
    mongoose.connect('mongodb://localhost:27017/leodb');
    var db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error"));
    db.once("open", function(callback){
      console.log("Connection Succeeded");

      // Delete the current database
      db.db.dropDatabase();

      // Add dummy-data inquiries
      Inquiry.insertMany(inquiries.inquiries, onInsert)
    });
  },
  postNewInquiry: function(app) {
    // Post new inquiry
    app.post('/inquiries', (req, res) => {
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
  },
  fetchAllInquiries: function(app) {
    // Fetch all inquiries
    app.get('/inquiries', ({}, res) => {
      Inquiry.find({}, function (error, inquiries) {
        if (error) { console.error(error); }
        res.send({
          inquiries: inquiries
        })
        // The newest inquiry will be the last object in the fetched array
      }).sort({_id:1}) 
    })
  }
};

function onInsert(err, docs) {
  if (err) throw err;
  console.info('%d inquiries were successfully stored.', docs.length);
}