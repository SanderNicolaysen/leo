import express from 'express';
import Priority from '../database/models/inquiry';

const router = express.Router();

// Get all priorities
router.get('/', async (req, res, next) => {
  try {
    const priorities = await Priority.find({}).exec();
    res.status(200).json(priorities);
  } catch (error) {
    next(error);
  }
});

// Update Priority
router.patch('/:type/', async (req, res, next) => {
  try {
    const priority = await Priority.findOneAndUpdate({ type: req.params.type }, { priority: req.body.priority }).exec();
    if (priority === null) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(priority);
  } catch (error) {
    next(error);
  }
});