// Dummy data 
import faqs from './seeds/faqs';
import typeMultipliers from './seeds/typeMultipliers';
import forenkletAnmeldelse from './seeds/forms/forenklet-anmeldelse';
import hentHittegods from './seeds/forms/hentHittegods';
import leverHittegods from './seeds/forms/leverHittegods';
import fornermede from './seeds/forms/fornermede';
import personopplysninger from './seeds/forms/personopplysninger';
import hendelse from './seeds/forms/hendelse';
import bil from './seeds/forms/bil';
import timeavtale from './seeds/forms/avtale';

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
    console.log("Connection to database succeeded");

    // Delete the current database
    mongoose.connection.db.dropDatabase();

    // Add dummy-data
    Faq.insertMany(faqs.faqs, onInsert);

    TypeMultiplier.insertMany(typeMultipliers.typeMultipliers, onInsert);

    Form.create(forenkletAnmeldelse, onCreate);
    Form.create(hentHittegods, onCreate);
    Form.create(leverHittegods, onCreate);
    Form.create(timeavtale, onCreate);
    Form.create(fornermede, onCreate);
    Form.create(personopplysninger, onCreate);
    Form.create(hendelse, onCreate);
    Form.create(bil, onCreate);

    // Inquiry.insertMany(inquiries.inquiries, onInsert);

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