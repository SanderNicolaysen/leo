import express from 'express';
const router = express.Router();
import Faq from '../database/models/faq';

// Post new faq
router.post('/', (req, res) => {
  const id = req.body.inquiry_id;
  const title = req.body.title;
  const question = req.body.question;
  const answer = req.body.answer;
  const fact = req.body.fact;

  const new_faq = new Faq({
    id: id,
    title: title,
    question: question,
    answer: answer,
    fact: fact
  });

  new_faq.save(function (error) {
    if (error) {
      console.log(error);
    }
    res.send({
      success: true,
      message: 'Faq saved successfully!'
    });
  });
});

// Fetch all faqs
router.get('/', (req, res) => {
  Faq.find({}, function (error, faqs) {
    if (error) {
      console.error(error);
    }
    res.send(faqs);
    // The newest faq will be the last object in the fetched array
  });
});

module.exports = router;