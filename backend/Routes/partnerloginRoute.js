const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Partner = require('../models/Partner');

// Partner login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log('Received login request:', { email, password }); // Log request body

  try {
    let partner = await Partner.findOne({ email });
    console.log('Partner found:', partner); // Log partner found

    if (!partner) {
      console.log('Invalid credentials: partner not found');
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, partner.password);
    console.log('Password match:', isMatch); // Log password match status

    if (!isMatch) {
      console.log('Invalid credentials: password does not match');
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create and return JWT token
    const payload = {
      partner: {
        id: partner.id,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) {
        console.error('Error signing token:', err.message); // Log token signing error
        throw err;
      }
      console.log('Token created:', token); // Log created token
      res.json({ token });
    });
  } catch (err) {
    console.error('Error logging in:', err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
