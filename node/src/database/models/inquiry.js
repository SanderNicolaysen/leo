import _ from 'lodash';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

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
  caseNumber: String,
  priority: {
    type: String,
    enum: ['1', '2', '3', '4', '5'],
    default: '1'
  }
});

InquirySchema.methods.getPoints = async function () {
  // relation between points and ms
  const pointratio = 0.001/60;
  
  let multiplier = 1;
  let bonus = 0;

  switch(this.priority) {
  case '1':
    multiplier = 1;
    break;
  case '2':
    multiplier = 1.6;
    break;
  case '3':
    multiplier = 2.5;
    break;
  case '4':
    multiplier = 3;
    bonus = 20;
    break;
  case '5':
    multiplier = 5;
    bonus = 120;
    break;
  default:
    multiplier = 1;
  }
  //     ((         AGE             ) * PRIORITYMULTIPLIER * GLOBALRATIO) + PRIORITYBONUSPOINTS
  return ((Date.now() - this.created) * multiplier         * pointratio)  + bonus;
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