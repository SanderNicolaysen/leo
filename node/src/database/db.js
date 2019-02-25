// Dummy data 
import faqs from './seeds/faqs';
import forenkletAnmeldelse from './seeds/forms/forenklet-anmeldelse';

// Models
import Faq from './models/faq';
import Form from './models/form';

import mongoose from 'mongoose';


module.exports = {
  setUpDB: function() {
    mongoose.connect('mongodb://localhost:27017/leodb', { useNewUrlParser: true });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error"));
    db.once("open", function(callback){
      console.log("Connection Succeeded");

      // Delete the current database
      db.db.dropDatabase();

      // Add dummy-data
      Faq.insertMany(faqs.faqs, onInsert);

      Form.create(forenkletAnmeldelse, onCreate);
    });
  }
};

function onInsert(err, docs) {
  if (err) throw err;
  console.info('%d documents were successfully stored.', docs.length);
}

function onCreate(err, doc) {
  if (err) {
    console.error('Error creating document:\n%d', doc);
    throw err;
  }
}