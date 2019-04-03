import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PrioritySchema = new Schema({
  type: String,
  priority: {
    type: String,
    enum: ['1', '2', '3', '4', '5']
  }
});

const Priority = mongoose.model("Priority", PrioritySchema);
module.exports = Priority;