import express from 'express';
const router = express.Router();
import Faq from '../database/models/faq';

router.get('/:subject', (req, res) => {
  Faq.find({subject: req.params.subject})
    .sort({id: 1})
    .exec()
    .then(doc => {
      console.log(doc);
      res.status(200).json(doc);
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
      res.status(200).json(doc);
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
  
  Faq.find({subject: subject}).countDocuments(function(error, size) {
    if (error) {
      console.log(error);
    }

    const new_faq = new Faq({
      id: size,
      subject: subject,
      question: question,
      answer: answer
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
    answer: req.body.answer
  };

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

router.put('/:subject', (req, res) => {
  const subject = req.params.subject;
  const body = req.body;

  // delete everything for specific subject and insert new body
  Faq.deleteMany({subject: subject})
    .exec()
    .then(result => {
      Faq.insertMany(body)
        .then(saveResult => {
          console.log(saveResult);
          res.status(200).json(saveResult);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
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

  Faq.deleteMany({subject: subject, id: id})
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