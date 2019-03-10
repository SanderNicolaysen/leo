import express from 'express';
import Inquiry from '../database/models/inquiry';
import mongoose from 'mongoose';
import crypto from 'crypto';
import auth from '../middleware/auth';
import _ from 'lodash';
import { io } from '../app';

const router = express.Router();

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

// Fetch next inquiry
router.get('/next', auth(), async (req, res, next) => {

  try {
    // Get all inquiries
    const inquiries = await Inquiry.find({}).exec();

    // If no inquiries are found, return not found status code
    if (_.size(inquiries) < 1) {
      res.sendStatus(404);
      return;
    }

    // Map the points of an inquiry to the inquiry in a new array
    let points = await Promise.all(_.map(inquiries, async function (i) {
      return { _id: i._id, points: await i.getPoints() };
    }));

    // Get the inquiry with the most points
    const first = _.find(inquiries, ['_id', _.maxBy(points, 'points')._id]);

    res.status(200).json(first);

  } catch (error) {
    next(error);
  }
});

// Fetch all inquiries
router.get('/', auth(), async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find({}).sort({ _id: 1 }).exec();
    res.status(200).json(inquiries);
  } catch (error) {
    next(error);
  }
});

// Start a new inquiry
router.post('/', async (req, res, next) => {
  const inquiry = new Inquiry({ type: req.body.type, created: Date.now() });

  // Create a random key with the inquiry, used for limiting access
  inquiry.key = crypto.randomBytes(32).toString('base64');

  // Assign an ID/queue number to the inquriy
  await inquiry.assignId();
  
  try {
    await inquiry.save();
    res.status(201).json(inquiry);
  } catch (error) {
    next(error);
  }
});

// Update inquiry
router.patch('/:id', async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.sendStatus(400);
    return;
  }

  try {
    const inquiry = await Inquiry.findById(req.params.id).exec();
    if (inquiry === null) {
      res.sendStatus(404);
      return;
    }

    // Authorize
    if (inquiry.key !== req.body.key) {
      res.sendStatus(401);
      return;
    }

    for (const prop in req.body) {
      inquiry[prop] = req.body[prop];
    }
    await inquiry.save();

    res.status(200).json(inquiry);
  } catch (error) {
    next(error);
  }
});

// Delete inquiry
router.delete('/:id', async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id).exec();

    if (inquiry === null) {
      res.sendStatus(404);
      return;
    }

    // Authorize
    if (inquiry.key !== req.body.key) {
      res.sendStatus(401);
      return;
    }

    await inquiry.delete();
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;