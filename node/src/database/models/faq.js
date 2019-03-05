import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const FaqSchema = new Schema({
  subject: String,
  question: String,
  answer: String
});

const Faq = mongoose.model("Faq", FaqSchema);
module.exports = Faq;