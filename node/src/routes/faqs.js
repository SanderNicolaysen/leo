import express from 'express';
const router = express.Router();
import Faq from '../database/models/faq';

// Get all faqs
router.get('/', async (req, res, next) => {
  try {
    const faqs = await Faq.find().exec();
    res.status(200).json(faqs);
  } 
  catch(error) {
    next(error);
  }
});

// Get all faqs from specific subject
router.get('/:subject', async (req, res, next) => {
  try {
    const faqs = await Faq.find({subject: req.params.subject}).exec();
    res.status(200).json(faqs);
  } 
  catch(error) {
    next(error);
  }
});

// Get one faq by subject and objectid
router.get('/:subject/:id', async  (req, res, next) => {
  try {
    const faq = await Faq.findOne({ subject: req.params.subject, _id: req.params.id }).exec();
    res.status(200).json(faq);
  }
  catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const new_faq = new Faq({
      subject: req.body.subject,
      question: req.body.question,
      answer: req.body.answer
    });
    await new_faq.save();
    res.status(201).json({
      faq: new_faq
    });
  }
  catch (error) {
    next(error);
  }
});

router.patch('/:subject/:id', async (req, res, next) => {
  const props = {
    question: req.body.question,
    answer: req.body.answer
  };

  try {
    const faq = await Faq.update({subject: req.params.subject, _id: req.params.id}, { $set: props }).exec();
    res.status(200).json(faq);
  }
  catch (error) {
    next(error);
  } 
});

// When changing the order
router.put('/:subject', async (req, res, next) => {
  try {
    // delete everything for specific subject and insert new body
    const deleteResponse = await Faq.deleteMany({subject: req.params.subject}).exec();
    const insertResponse = await Faq.insertMany(req.body);

    res.status(200).json({
      deleteResponse: deleteResponse,
      insertResponse: insertResponse
    });
  }
  catch (error) {
    next(error);
  }
});


router.delete('/:subject/:id', async (req, res, next) => {
  console.log(req.params);

  try {
    const result = await Faq.deleteMany({subject: req.params.subject, _id: req.params.id}).exec();
    res.status(200).json(result);
  }
  catch (error) { 
    next(error);
  }
});

module.exports = router;