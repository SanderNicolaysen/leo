import express from 'express';
import Booth from '../database/models/booth';

const router = express.Router();

// Fetch all booths
router.get('/', async (req, res, next) => {
  try {
    const booths = await Booth.find({}).sort({ _id: 1 }).exec();
    res.status(200).json(booths);
  } catch (error) {
    next(error);
  }
});

// Update booth
router.patch('/:boothNum/update', async (req, res, next) => {

  try {
    const booth = await Booth.findOne({ num: req.params.boothNum });
    
    if (booth === null) {
      res.sendStatus(404);
      return;
    }

    delete req.body.__v;
    booth['ip'] = req.connection.remoteAddress;
    await booth.save();

    res.status(200).json(booth);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = router;