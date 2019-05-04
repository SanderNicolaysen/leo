import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PrioritySchema = new Schema({
  type: String,
  priority: {
    type: String,
    enum: ['normal', 'high', 'urgent']
  }
});

const Priority = mongoose.model("Priority", PrioritySchema);
module.exports = Priority;