const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Route to create a user
router.post("/createuser", [
  body('email').isEmail(),
  body('name').isLength({ min: 6 }),
  body('password').isLength({ min: 5 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const salt = await bcrypt.genSalt(10);
 let secPassword = await bcrypt.hash(req.body.password,salt)
  try {
    await User.create({
      name: req.body.name,
      password: secPassword, // Plain text password
      email: req.body.email,
      location: req.body.location
    });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
    
  }
});



module.exports = router;
