// Dummy data 
import inquiries from './seeds/inquiries';
import faqs from './seeds/faqs'

// Models
import Inquiry from './models/inquiry';
import Faq from './models/faq'

import mongoose from 'mongoose';


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
      Faq.insertMany(faqs.faqs, onInsert);
    });
  }
};

function onInsert(err, docs) {
  if (err) throw err;
  console.info('%d inquiries were successfully stored.', docs.length);
}