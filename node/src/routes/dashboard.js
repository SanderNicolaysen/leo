import express from 'express';
import _ from 'lodash';
import Inquiry from '../database/models/inquiry';

const router = express.Router();

router.get('/stats', async (req, res, next) => {
  let inquiries;
  try {
    inquiries = await Inquiry.find({}).exec();
  } catch (error) {
    next(error);
    return;
  }
  const queueCount = _.sumBy(inquiries, (o) => { return o.status !== 'Ferdig' ? 1 : 0; });
  const inprogressCount = _.sumBy(inquiries, (o) => { return o.status === 'Behandles' ? 1 : 0; });

  console.log(`queue: ${queueCount}, inprogress: ${inprogressCount}`);
  res.json({ queue: queueCount, inprogress: inprogressCount });
});

module.exports = router;