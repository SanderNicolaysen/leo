// Dummy data 
import faqs from './seeds/faqs';
import priorities from './seeds/priorities';
import fornermede from './seeds/forms/fornermede';
import personopplysninger from './seeds/forms/personopplysninger';
import bil from './seeds/forms/bil';
import sykkel from './seeds/forms/sykkel';
import firma from './seeds/forms/firma';
import telefon from './seeds/forms/telefon';
import booths from './seeds/booths';

// Models
import Faq from './models/faq';
import priority from './models/priority';
import Booth from './models/booth';
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
    Booth.insertMany(booths.booths, onInsert);

    priority.insertMany(priorities.priorities, onInsert);

    Form.create(fornermede, onCreate);
    Form.create(personopplysninger, onCreate);
    Form.create(bil, onCreate);
    Form.create(sykkel, onCreate);
    Form.create(firma, onCreate);
    Form.create(telefon, onCreate);

    // Inquiry.insertMany(inquiries.inquiries, onInsert);

    User.register(new User({ username: 'leo', name: 'Admin', isAdmin: true }), 'secret', function (err) {
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