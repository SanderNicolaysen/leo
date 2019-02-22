import express from 'express';
import Form from '../database/models/form';

const router = express.Router();

// Retrieve a (single) form
router.get('/:name', async (req, res, next) => {
  try {
    const form = await Form.findOne({ name: req.params.name }).exec();

    if (form === null) {
      res.sendStatus(404);
    }

    res.status(200).send(form);
  } catch (error) {
    next(error);
  }
});

module.exports = router;