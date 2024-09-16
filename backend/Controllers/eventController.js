const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  const { name, date, location, partnerId, commissionRate } = req.body;
  try {
    const newEvent = new Event({ name, date, location, partnerId, commissionRate });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) { 
    res.status(400).json({ message: error.message });
  }
};

exports.getEventSalesStatus = async (req, res) => {
  const { eventId } = req.params;
  try {
    const event = await Event.findById(eventId).populate('tickets');
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
