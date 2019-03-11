import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  type: String,
  hostName: String,
  userName: String,
  userNIN: String
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);
module.exports = Appointment;