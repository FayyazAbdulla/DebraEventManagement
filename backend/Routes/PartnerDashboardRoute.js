const express = require('express');
const router = express.Router();
const { fetchPartnerEvents } = require('../Controllers/partnerController'); // Adjust controller import path as per your setup
const authenticateToken = require('../middleware/auth'); // Adjust the path as needed

// Route to fetch partner events
router.get('/events', authenticateToken, async (req, res) => {
  try {
    console.log('Fetching partner events...');
    
    // Call a controller function to handle fetching events
    const events = await fetchPartnerEvents(req.user); // Assuming req.user contains partner information after authentication
    
    console.log('Fetched partner events successfully:', events);
    res.json(events);
  } catch (error) {
    console.error('Error fetching partner events:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
