const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "mynameisrajeshbaghelfromgwalior"

// Route to handle user login
// Route to handle user login
router.post("/loginuser", async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }


  let email = req.body.email;

  try {
    let user = await User.findOne({ email });
    console.log("error erro");

    if (!user) {
      return res.status(400).json({ success: false, error: "Invalid credentials" });
    }
   
     const pwtCompare = await bcrypt.compare(req.body.password,user.password)
    if (!pwtCompare) { // Corrected condition
      return res.status(400).json({ error: "Invalid credentials" });
    }
     const  data = {
      user: {
        id: user.id
      }
     }
     
     const authToken = jwt.sign(data,jwtSecret)
    res.json({ success: true , authToken: authToken });
  } catch (error) {
    console.log(error);
    res.json({ success: false, error: "Error logging in user" });
  }
});


module.exports = router;
