// controllers/foods.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
  const currentUser = await User.findById(req.session.user._id);
  console.log(currentUser.pantry);
  res.render('foods/index.ejs',{
    pantry: currentUser.pantry,
  });
});

router.get('/new', (req, res) => {
  res.render('foods/new.ejs');
});

router.post('/', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Push req.body (the new form data object) to the
    // pantry array of the current user
    //console.log(req.body);
    currentUser.pantry.push(req.body);
    // Save changes to the user
    await currentUser.save();
    // Redirect back to the foods index view
    res.render('foods/index.ejs', {
      pantry: currentUser.pantry,
    });
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});
router.get('/:foodId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const food = currentUser.pantry.id(req.params.foodId);
    res.render('foods/edit.ejs', {
      food: food,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});   
router.put('/:foodId', async (req, res) => {
  try {
    // Find the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Find the current pantry item from the id supplied by req.params
    const food = currentUser.pantry.id(req.params.foodId);
    // Update the pantry item with the new data from the form
    food.set(req.body);
    // Save the current user
    await currentUser.save();
    // Redirect back to the foods index view
    res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});
   
router.delete('/:foodId', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Use the Mongoose .deleteOne() method to delete
    // a food item using the id supplied from req.params
    currentUser.pantry.id(req.params.foodId).deleteOne();
    // Save changes to the user
    await currentUser.save();
    // Redirect back to the foods index view
    res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});



module.exports = router;
