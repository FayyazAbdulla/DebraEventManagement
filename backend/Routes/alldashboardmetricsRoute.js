//alldashboardmetricRoute.js 
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/adminAuth');
const Event = require('../models/Event');
const Ticket = require('../models/Ticket');
const Partner = require('../models/Partner');

// Fetch dashboard metrics
router.get('/', verifyToken, async (req, res) => {
  try {
    const eventCount = await Event.countDocuments();
    const partnerCount = await Partner.countDocuments();
    const ticketSales = await Ticket.aggregate([
      { $group: { _id: null, totalSales: { $sum: "$price" } } }
    ]);

    const metrics = {
      eventCount,
      partnerCount,
      totalSales: ticketSales[0]?.totalSales || 0,
    };

    res.status(200).json(metrics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard metrics' });
  }
});

module.exports = router;
