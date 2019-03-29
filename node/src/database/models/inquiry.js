import _ from 'lodash';
import mongoose from 'mongoose';
import TypeMultiplier from './typeMultiplier';
const Schema = mongoose.Schema;

// const appointment = new Schema({
//   type: String,
//   surname: String,
//   birth: String,
//   caseNumber: String
// });

const InquirySchema = new Schema({
  inquiry_id: Number,
  NIN: Number,
  type: String, 
  forms: [mongoose.model('Form').schema],
  key: String,
  created: { type : Date, default: Date.now },
  fname: String,
  lname: String,
  dob: String,
  status: {
    type: String,
    enum: ['Venter', 'Skriver', 'Behandles', 'Ferdig'],
    default: 'Skriver'
  },
  caseNumber: String
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

InquirySchema.methods.assignId = async function () {
  const model = this.constructor;
  const inquiries = await model.find({}).select('inquiry_id -_id').exec();
  const numbers = _.map(inquiries, 'inquiry_id');
  
  do {
    this.inquiry_id = _.random(100, 999);
  } while (_.some(numbers, this.inquiry_id));
};

const Inquiry = mongoose.model("Inquiry", InquirySchema);
module.exports = Inquiry;