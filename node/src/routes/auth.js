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

router.get('/user', (req, res, next) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.sendStatus(404);
  }
});

router.post('/register', auth(), async (req, res, next) => {
  try {
    await User.register(new User({ username: req.body.username, name: req.body.name }), req.body.password);
  } catch (error) {
    next(error);
    return;
  }

  res.sendStatus(201);
});

module.exports = router;