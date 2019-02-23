import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const FaqSchema = new Schema({
  id: Number,
  subject: String,
  question: String,
  answer: String,
  statement: String,
});

const Faq = mongoose.model("Faq", FaqSchema);
module.exports = Faq;