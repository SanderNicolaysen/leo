import inquiries from './seeds/inquiries';
import mongoose from 'mongoose';
import Inquiry from './models/inquiry';

module.exports = {
  setUpDB: function() {
    mongoose.connect('mongodb://localhost:27017/leodb');
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error"));
    db.once("open", function(callback){
      console.log("Connection Succeeded");

      // Delete the current database
      db.db.dropDatabase();

      // Add dummy-data inquiries
      Inquiry.insertMany(inquiries.inquiries, onInsert);
    });
  }
};

function onInsert(err, docs) {
  if (err) throw err;
  console.info('%d inquiries were successfully stored.', docs.length);
}