var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var InquirySchema = new Schema({
  inquiry_id: Number,
  first_name: String,
  last_name: String,
  gender: String,
  NIN: Number,
  detail1: String,
  detail2: String
});

var Inquiry = mongoose.model("Inquiry", InquirySchema);
module.exports = Inquiry;