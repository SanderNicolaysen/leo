import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  isAdmin: Boolean
});

UserSchema.plugin(passportLocalMongoose, {
  
});

const User = mongoose.model("User", UserSchema);
module.exports = User;