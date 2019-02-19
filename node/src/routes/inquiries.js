import express from 'express';
const router = express.Router();
import Inquiry from '../database/models/inquiry';

// Post new inquiry
router.post('/', (req, res) => {
  const inquiry_id = req.body.inquiry_id;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const gender = req.body.gender;
  const NIN = req.body.NIN;
  const type = req.body.type;

  const new_inquiry = new Inquiry({
    inquiry_id: inquiry_id,
    first_name: first_name,
    last_name: last_name,
    gender: gender,
    NIN: NIN,
    type: type
  });

  new_inquiry.save(function (error) {
    if (error) {
      console.log(error);
    }
    res.send({
      success: true,
      message: 'Inquiry saved successfully!'
    });
  });
});

// Fetch all inquiries
router.get('/', (req, res) => {
  Inquiry.find({}, function (error, inquiries) {
    if (error) {
      console.error(error);
    }
    res.send(inquiries);
    // The newest inquiry will be the last object in the fetched array
  }).sort({
    _id: 1
  });
});

module.exports = router;