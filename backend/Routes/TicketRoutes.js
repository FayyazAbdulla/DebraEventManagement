const express = require('express');
const router = express.Router();
const {
  getTickets,
  createTicket,
  sellTicket,
  updateTicket,
  deleteTicket,
} = require('../Controllers/TicketsController'); // This should match the file name exactly

// Route to fetch all tickets
router.get('/', getTickets);

// Route to create a new ticket
router.post('/create', createTicket);

// Route to sell a ticket
router.post('/sell/:id', sellTicket);

// Route to update a ticket
router.put('/:id', updateTicket);

// Route to delete a ticket
router.delete('/:id', deleteTicket);

module.exports = router; 
