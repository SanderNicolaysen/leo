import express from 'express';
import Booth from '../database/models/booth';

const router = express.Router();

// Fetch booth
router.get('/', async (req, res, next) => {
  try {
    const booth = await Booth.findOne({ ip: req.connection.remoteAddress }).exec();

    if (booth != null) {
      res.status(200).json(booth.num);
    }
    else {
      res.json(null);
    }
  } catch (error) {
    next(error);
  }
});

// Update booth
router.patch('/:boothNum/update', async (req, res, next) => {

  try {
    const oldBooth = await Booth.findOne({ ip: req.connection.remoteAddress });
    const newBooth = await Booth.findOne({ num: req.params.boothNum });
    
    if (newBooth === null) {
      res.sendStatus(404);
      return;
    }

    delete req.body.__v;

    if (newBooth.ip != "" && !req.body.confirmOverwrite) {
      res.json({ oldBooth: oldBooth, booth: newBooth, taken: true });
      return;
    }

    // An IP-address can only be assigned to one booth at a time
    if (oldBooth != null) {
      oldBooth['ip'] = '';
      await oldBooth.save();
    }

    newBooth['ip'] = req.connection.remoteAddress;
    await newBooth.save();

    res.status(200).json(newBooth);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = router;