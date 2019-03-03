// Dummy data 
import faqs from './seeds/faqs';
import typeMultipliers from './seeds/typeMultipliers';
import forenkletAnmeldelse from './seeds/forms/forenklet-anmeldelse';
import hittegods from './seeds/forms/hittegods';

// Models
import Faq from './models/faq';
import TypeMultiplier from './models/typeMultiplier';
import Form from './models/form';
import User from './models/user';

import mongoose from 'mongoose';


module.exports = {
  setUpDB: async function () {
    const ret = await mongoose.connect('mongodb://localhost:27017/leodb', { useNewUrlParser: true });
    if (ret !== mongoose) {
      console.error("connection error");
    }
    console.log("Connection Succeeded");

    // Delete the current database
    mongoose.connection.db.dropDatabase();

    // Add dummy-data
    Faq.insertMany(faqs.faqs, onInsert);

    TypeMultiplier.insertMany(typeMultipliers.typeMultipliers, onInsert);

    Form.create(forenkletAnmeldelse, onCreate);
    Form.create(forenkletAnmeldelse, onCreate);
    Form.create(hittegods, onCreate);

    User.register(new User({ username: 'leo' }), 'secret', function (err) {
      if (err) {
        console.error('Error while registering default user', err);
      } else {
        console.log('Registered user "leo"');
      }
    });
  },
  connection: function () {
    return mongoose.connection;
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