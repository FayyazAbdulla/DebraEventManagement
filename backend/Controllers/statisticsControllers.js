const Event = require('../models/Event'); // Import your Event model

const fetchSummaryStatistics = async (req, res) => {
  try {
     // Fetch all events
    const events = await Event.find();
 
    // Calculations
    const totalEvents = events.length;
    const totalTicketsSold = events.reduce((total, event) => total + (event.ticketsSold || 0), 0);
    const totalRevenue = events.reduce((total, event) => total + (event.revenue || 0), 0);

    res.json({
      totalEvents,
      totalTicketsSold,
      totalRevenue,
    });
  } catch (error) {
    console.error('Error fetching summary statistics:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  fetchSummaryStatistics,
};
