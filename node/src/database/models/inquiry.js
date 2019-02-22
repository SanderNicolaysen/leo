import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const InquirySchema = new Schema({
  inquiry_id: Number,
  first_name: String,
  last_name: String,
  gender: String,
  NIN: Number,
  type: String,
  form: mongoose.model('Form').schema
});

const Inquiry = mongoose.model("Inquiry", InquirySchema);
module.exports = Inquiry;