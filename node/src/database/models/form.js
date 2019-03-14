import mongoose from 'mongoose';
import { _kebabCase } from 'lodash';
const Schema = mongoose.Schema;

const ElementSchema = new Schema({
  id: Number,
  label: String,
  type: String,
  info: String,
  choices: Array,
  value: String,
  sizeClass: String
});

const PageSchema = new Schema({
  id: Number,
  title: String,
  subtitle: String,
  info: String,
  nextPage: Number,
  prevPage: Number,
  elements: [ElementSchema]
});

const FormSchema = new Schema({
  name: String,
  normalizedName: String,
  layout: {
    type: String,
    enum: ['normal', 'split']
  },
  pages: [PageSchema]
});

FormSchema.methods.setName = function (name) {
  this.name = name;
  this.normalizedName = _kebabCase(name);
};

const Form = mongoose.model("Form", FormSchema);
module.exports = Form;