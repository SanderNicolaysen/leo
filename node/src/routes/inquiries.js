import express from 'express';
import Inquiry from '../database/models/inquiry';
import mongoose from 'mongoose';

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
    res.sendStatus(404);
    return;
  }

  try {
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();

    if (inquiry === null) {
      res.sendStatus(404);
      return;
    }

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

    await inquiry.delete();
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;