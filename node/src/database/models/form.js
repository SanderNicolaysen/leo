import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ElementSchema = new Schema({
  id: Number,
  label: String,
  info: String,
  type: String,
  choices: Array,
  value: String,
  sizeClass: String
});

const PageSchema = new Schema({
  id: Number,
  title: String,
  subtitle: String,
  nextPage: Number,
  prevPage: Number,
  elements: [ElementSchema]
});

const FormSchema = new Schema({
  name: String,
  pages: [PageSchema]
});

const Form = mongoose.model("Form", FormSchema);
module.exports = Form;