const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
  res.render('users/index.ejs', { users: await User.find({}) });
});
router.get('/show/:userId', async (req, res) => {
  console.log("show user pantry list....");
  console.log(req.params.userId);
  res.render('users/show.ejs', {
    user: await User.findById(req.params.userId),
    pantry: await User.findById(req.params.userId).populate('pantry'),
   });
});
module.exports = router;