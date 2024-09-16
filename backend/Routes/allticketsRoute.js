//allticketroute.js
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/adminAuth');
const Ticket = require('../models/Ticket');

// Fetch ticket sales
router.get('/', verifyToken, async (req, res) => {
  try {
    const sales = await Ticket.aggregate([
      { $group: { _id: null, totalSales: { $sum: "$price" } } }
    ]);
    res.status(200).json(sales[0] || { totalSales: 0 });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ticket sales' });
  }
});

module.exports = router;
