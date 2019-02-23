import express from 'express';
const router = express.Router();
import Faq from '../database/models/faq';

router.get('/:subject', (req, res) => {
  Faq.find({subject: req.params.subject})
    .exec()
    .then(doc => {
      console.log(doc);
      if (doc && doc.length > 0) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ 
          message: `No entries found in api/faqs/${req.params.subject}`,
          error: 404
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
});

router.get('/:subject/:id', (req, res) => {
  // Get parameters from uri
  const subject = req.params.subject;
  const id = req.params.id;

  Faq.find({ subject: subject, id: id })
    .exec()
    .then(doc => {
      console.log(doc);
      if (doc && doc.length > 0) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: `No entries found api/faqs/${subject}/${id}`,
          error: 404
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
});

router.post('/', (req, res) => {
  const subject = req.body.subject;
  const question = req.body.question;
  const answer = req.body.answer;
  const statement = req.body.statement;
  
  Faq.find({subject: subject}).count(function(error, size) {
    if (error) {
      console.log(error);
    }

    const new_faq = new Faq({
      id: size,
      subject: subject,
      question: question,
      answer: answer,
      statement: statement
    });
    
    new_faq
      .save() 
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "POST request successful",
          faq: result
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
});

router.patch('/:subject/:id', (req, res) => {
  const subject = req.params.subject;
  const id = req.params.id;

  const props = {
    question: req.body.question,
    answer: req.body.answer,
    statement: req.body.statement
  };

  console.log(props);

  Faq.update({subject: subject, id: id}, { $set: props })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete('/:subject/:id', (req, res) => {
  const subject = req.params.subject;
  const id = req.params.id;

  Faq.remove({subject: subject, id: id})
    .exec()
    .then(doc => {
      console.log(doc);
      res.status(200).json(doc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;