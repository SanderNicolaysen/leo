import mongoose from 'mongoose';
import TypeMultiplier from './typeMultiplier';
const Schema = mongoose.Schema;

const InquirySchema = new Schema({
  inquiry_id: Number,
  first_name: String,
  last_name: String,
  gender: String,
  NIN: Number,
  type: String,
  form: mongoose.model('Form').schema,
  key: String,
  created: Number,
});

InquirySchema.methods.getPoints = async function () {
  // relation between points and ms
  const pointratio = 0.001/60;

  let mul;
  try {
    mul = (await TypeMultiplier.findOne({ type: this.type }).exec()).multiplier;
  } catch (error) {
    mul = 1;
  }
  return (Date.now() - this.created) * mul * pointratio;
};

const Inquiry = mongoose.model("Inquiry", InquirySchema);
module.exports = Inquiry;