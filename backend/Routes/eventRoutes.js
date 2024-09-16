const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Event creation route
router.post('/', async (req, res) => {
  const { name, date, location, partnerId } = req.body;
  console.log('Received event creation request:', req.body);

  try { 
    // Create a new event instance
    const event = new Event({
      name,
      date, 
      location,
      partnerId, 
    });

    // Save the event to the database
    console.log('Saving the new event to the database...');
    await event.save();
    console.log('Event saved successfully:', event);

    res.json({ msg: 'Event created successfully', event });
  } catch (err) {
    console.error('Error occurred while creating event:', err.message);
    res.status(500).send({ error: 'Server error', message: err.message });
  }
});

module.exports = router;
