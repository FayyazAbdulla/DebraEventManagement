//model/Tickets.js
const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  eventId: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  sold: { type: Number, default: 0 },
});

module.exports = mongoose.model('Ticket', TicketSchema);
