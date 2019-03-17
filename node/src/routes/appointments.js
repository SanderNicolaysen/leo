import express from 'express';
const router = express.Router();
import Appointment from '../database/models/appointment';

router.post('/', async (req, res, next) => {
  try {
    const new_appointment = new Appointment({
      type: req.body.type,
      hostName: req.body.hostName,
      userName: req.body.userName,
      userBirth: req.body.userBirth,
      caseNumber: req.body.caseNumber
    });
    await new_appointment.save();
    res.status(201).json(new_appointment);
  }
  catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const appointments = await Appointment.find({}).exec();
    res.status(200).json(appointments);
  }
  catch (error) {
    next(error);
  }
});

module.exports = router;