import express from 'express';
import Inquiry from '../database/models/inquiry';

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
  const inquiry = new Inquiry({});

  try {
    await inquiry.save();
    res.status(201).json(inquiry);
  } catch (error) {
    next(error);
  }
});

// Update inquiry
router.patch('/:id', async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id).exec();

    if (inquiry === null) {
      res.sendStatus(404);
      return;
    }

    // Copy values from the request body into the inquiry
    Object.keys(req.body).forEach((field) => {
      inquiry[field] = req.body[field];
    });

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

    await inquiry.delete();
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;