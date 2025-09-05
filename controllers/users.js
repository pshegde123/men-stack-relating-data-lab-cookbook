const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
  res.render('users/index.ejs', { users: await User.find({}) });
});
router.get('/show/:userId', async (req, res) => {
  //console.log("show user pantry list....");
  //console.log(req.params.userId);
  const pantry_item_list = await User.findOne({ _id: req.params.userId }).populate('pantry');
  //console.log(pantry_item_list);
  res.render('users/show.ejs', {
    user: await User.findById(req.params.userId),
    pantry: [...pantry_item_list.pantry],
   });
});
module.exports = router;