import express from 'express';
import Inquiry from '../database/models/inquiry';
import mongoose from 'mongoose';
import crypto from 'crypto';

const router = express.Router();

// Fetch all inquiries
router.get('/', async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find({}).sort({ _id: 1 }).exec();
    res.status(200).json(inquiries);
  } catch (error) {
    next(error);
  }
});

// Start a new inquiry
router.post('/', async (req, res, next) => {
  const inquiry = new Inquiry({ type: req.body.type });

  // Create a random key with the inquiry, used for limiting access
  inquiry.key = crypto.randomBytes(32).toString('base64');
  
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