import express from 'express';
const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({ message: 'Admin dashboard requires authentication!' });
});

module.exports = router;