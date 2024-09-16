const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/adminAuth');
const Event = require('../models/Event');

// Fetch all events
router.get('/', verifyToken, async (req, res) => { // Corrected path
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events' });
  }
});

// Add a new event
router.post('/', verifyToken, async (req, res) => { // Corrected path
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error adding event' });
  }
});

// Update an existing event
router.put('/:eventId', verifyToken, async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.eventId, req.body, { new: true });
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error updating event' });
  }
});

// Delete an event
router.delete('/:eventId', verifyToken, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.eventId);
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event' });
  }
});

module.exports = router;
