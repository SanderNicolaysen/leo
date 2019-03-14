import express from 'express';
import Form from '../database/models/form';
import auth from '../middleware/auth';

const router = express.Router();

// Returns a list with the names of all forms in the database
router.get('/list', auth(), async (req, res, next) => {
  try {
    const formList = await Form.find({}).select('name normalizedName').exec();

    res.send(formList);
  } catch (error) {
    next(error);
  }
});

router.put('/:name', auth(), async (req, res, next) => {
  try {
    const form = await Form.findOneAndUpdate({ normalizedName: req.params.name }, req.body).exec();

    res.status(200).json(form);
  } catch (error) {
    next(error);
  }
});

// Retrieve a (single) form
router.get('/:name', async (req, res, next) => {
  try {
    const form = await Form.findOne({ normalizedName: req.params.name }).exec();

    if (form === null) {
      res.sendStatus(404);
    }

    res.status(200).send(form);
  } catch (error) {
    next(error);
  }
});

module.exports = router;