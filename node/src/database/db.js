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
  /**
   * Initiate the database, create and insert models if it's the first time or if running in development
   * @returns mongoose database connection
   */
  init: async function () {
    if (!await this.connect()) {
      console.error("Database connection error");
      return null;
    }

    if (process.env.NODE_ENV === 'development') {
      await mongoose.connection.db.dropDatabase();
      await this.seed();
    }

    // Make sure that the DB is set up
    const users = await User.find({}).exec();
    if (users.length === 0) {
      console.log('Setting up application database...');
      await this.seed();
    }
    
    await this.ensureCreatedAdminUser();

    return mongoose.connection;
  },

  connect: async function () {
    if (!process.env.DB_HOST) process.env.DB_HOST = 'localhost';
    if (!process.env.DB_PORT) process.env.DB_PORT = '27017';
    if (!process.env.DB_NAME) process.env.DB_NAME = 'leodb';
    if (!process.env.DB_USER) process.env.DB_USER = '';
    if (!process.env.DB_PASS) process.env.DB_PASS = '';

    const uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    const options = {
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
      useNewUrlParser: true
    };
    mongoose.set('useCreateIndex', true);

    if (process.env.DB_DEBUG === 'TRUE') {
      mongoose.set('debug', true);
    }

    try {
      await mongoose.connect(uri, options);
    } catch (error) {
      console.error(error);
      return false;
    }

    return true;
  },

  seed: async function () {
    await Promise.all([
      // Add dummy-data
      Faq.insertMany(faqs.faqs),

      // Create 3 booths
      Booth.insertMany(booths.booths),

      // Insert default prorities
      priority.insertMany(priorities.priorities),

      // Insert default forms
      Form.create(fornermede),
      Form.create(personopplysninger),
      Form.create(bil),
      Form.create(sykkel),
      Form.create(firma),
      Form.create(telefon)

      // Inquiry.insertMany(inquiries.inquiries, onInsert)
    ]);
  },

  ensureCreatedAdminUser: async function () {
    const admin = await User.findOne({ isAdmin: true });

    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;

    if (!username || !password) {
      console.log('Missing administrator username and password.\nPlease add ADMIN_USERNAME and ADMIN_PASSWORD to .env file.');
      return;
    }

    if (admin) {
      admin.username = process.env.ADMIN_USERNAME;
      await admin.setPassword(process.env.ADMIN_PASSWORD);
      await admin.save();
      console.log(`Admin username and password have been reset to enviroment default (username: '${admin.username}').`);
    } else {
      User.register(new User({ username: process.env.ADMIN_USERNAME, name: 'Admin', isAdmin: true }), process.env.ADMIN_PASSWORD, (error) => {
        if (error) {
          console.error('Error while registering admin user', error);
        } else {
          console.log(`Registered user ${process.env.ADMIN_USERNAME} with admin privileges`);
        }
      });
    }
  }
};