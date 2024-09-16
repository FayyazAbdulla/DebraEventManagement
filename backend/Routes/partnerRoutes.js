const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Partner = require('../models/Partner');
const { getPartnerEvents } = require('../Controllers/partnerController');
const authMiddleware = require('../middleware/auth');

// Partner registration route
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let partner = await Partner.findOne({ email });
    if (partner) {
      return res.status(400).json({ msg: 'Partner already exists' });
    }

    partner = new Partner({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    partner.password = await bcrypt.hash(password, salt);

    await partner.save();

    res.json({ msg: 'Partner registered successfully', partner });
  } catch (err) {
    res.status(500).send('Server error');
  }
});
// Route to fetch events for a specific partner
// router.get('/events', authMiddleware, getPartnerEvents);

module.exports = router;
