import express from 'express';
import passport from 'passport';
import User from '../database/models/user';
import auth from '../middleware/auth';
import mongoose from 'mongoose';
import { request } from 'http';

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

router.get('/users', async (req, res, next) => {
  if (!req.user)
    res.sendStatus(400);

  try {
    const users = await User.find().exec();
    res.status(200).json(users);
  } 
  catch(error) {
    next(error);
  }
});

router.post('/register', auth(), async (req, res, next) => {
  try {
    if (!req.body.username && !req.body.newPassword && !req.body.name) {
      res.sendStatus(400);
      return;
    }

    const user = await User.register(new User({ username: req.body.username, name: req.body.name }), req.body.password);
    res.status(201).json({
      name: user.name,
      username: user.username,
      _id: user._id
    });
  } catch (error) {
    next(error);
    return;
  }

});

// Delete user
router.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).exec();

    if (user.isAdmin) {
      res.status(406).json({err: 'Deleting admin is not allowed'});
      return;
    }

    if (user === null) {
      res.sendStatus(404);
      return;
    }

    await user.delete();
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }

});

router.patch('/user/:id', async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.sendStatus(400);
    return;
  }

  try {
    const user = await User.findById(req.params.id).exec();
    if (user === null) {
      res.sendStatus(404);
      return;
    }
    
    // Two users are not allowed to have same username
    const users = await User.find().exec();
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === req.body.username && users[i]._id != req.params.id) {
        res.sendStatus(400);
        return;
      }
    }

    for (const prop in req.body) {
      user[prop] = req.body[prop];
    } 

    if (req.body.newPassword) {
      await user.setPassword(req.body.newPassword);
    }

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});


module.exports = router;