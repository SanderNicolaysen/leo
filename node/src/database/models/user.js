import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

UserSchema.methods.validPassword = function (password) {
  return password === this.password;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;