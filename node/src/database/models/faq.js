import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const FaqSchema = new Schema({
  id: Number,
  title: String,
  question: String,
  answer: String,
  fact: Object
});

const Faq = mongoose.model("Faq", FaqSchema);
module.exports = Faq;