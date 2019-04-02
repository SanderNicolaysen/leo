import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const BoothSchema = new Schema({
  num: Number,
  ip: String
});

const Booth = mongoose.model("Booth", BoothSchema);
module.exports = Booth;