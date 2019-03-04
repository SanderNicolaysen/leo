import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TypeMultiplierSchema = new Schema({
  type: String,
  multiplier: Number
});

const TypeMultiplier = mongoose.model("TypeMultiplier", TypeMultiplierSchema);
module.exports = TypeMultiplier;