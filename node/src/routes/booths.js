import express from 'express';
import Booth from '../database/models/booth';

const router = express.Router();

// Fetch booth
router.get('/', async (req, res, next) => {
  try {
    // Fetch the booth which the requesting computer is assigned to via it's IP-address, if it exists
    const booth = await Booth.findOne({ ip: req.connection.remoteAddress }).exec();

    if (booth != null) { // Fetch the assigned booth-num
      res.status(200).json(booth);
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
    // Fetch the booth which the requesting computer is currently assigned to, if it exists
    const oldBooth = await Booth.findOne({ ip: req.connection.remoteAddress });
    // Fetch the booth which the requesting computer wants to be assigned to next, if it exists
    const newBooth = await Booth.findOne({ num: req.params.boothNum });
    
    // If the new booth is not found, return not found status code
    if (newBooth === null) {
      res.sendStatus(404);
      return;
    }

    // If the new booth is already taken, and it has not been confirmed to take it - return the current booth, the new booth and a boolean called 'taken' which is true
    if (newBooth.ip != "" && !req.body.confirmedOverwrite) {
      res.json({ oldBooth: oldBooth, newBooth: newBooth, taken: true });
      return;
    }

    // An IP-address can only be assigned to one booth at a time
    if (oldBooth != null) {
      oldBooth['ip'] = '';
      oldBooth['queueNumber'] = '';
      await oldBooth.save();
    }

    // Assign the requesting PC to the booth it want's to be assigned to
    newBooth['ip'] = req.connection.remoteAddress;
    
    await newBooth.save();

    res.status(200).json(newBooth);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
