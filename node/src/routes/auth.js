import express from 'express';
import passport from 'passport';
import User from '../database/models/user';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});


router.post('/register', auth(), async (req, res, next) => {
  try {
    await User.register(new User({ username: req.body.username }), req.body.password);
  } catch (error) {
    next(error);
    return;
  }
  
  res.sendStatus(201);
});

module.exports = router;