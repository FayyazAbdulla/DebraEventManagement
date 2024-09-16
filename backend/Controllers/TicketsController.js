const Ticket = require('../models/Ticket'); // Adjust the path as needed

// Fetch all tickets
const getTickets = async (req, res) => {
  console.log('Fetching all tickets');
  try {
    const tickets = await Ticket.find();
    console.log('Tickets fetched successfully:', tickets);
    res.status(200).json(tickets);
  } catch (error) { 
    console.error('Error fetching tickets:', error.message);
    res.status(500).json({ message: 'Error fetching tickets', error: error.message });
  }
};

// Create a new ticket
const createTicket = async (req, res) => {
  const { eventId, type, price, quantity } = req.body;
  console.log('Creating a new ticket with data:', req.body);
  try {
    const newTicket = new Ticket({ eventId, type, price, quantity, sold: 0 });
    await newTicket.save();
    console.log('Ticket created successfully:', newTicket);
    res.status(201).json(newTicket);
  } catch (error) {
    console.error('Error creating ticket:', error.message);
    res.status(500).json({ message: 'Error creating ticket', error: error.message });
  }
};

// Sell a ticket
const sellTicket = async (req, res) => {
  const { id } = req.params;
  console.log(`Selling a ticket with ID: ${id}`);
  try {
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      console.log('Ticket not found');
      return res.status(404).json({ message: 'Ticket not found' });
    }
    if (ticket.sold >= ticket.quantity) {
      console.log('No tickets available');
      return res.status(400).json({ message: 'No tickets available' });
    }
    ticket.sold += 1;
    await ticket.save();
    console.log('Ticket sold successfully:', ticket);
    res.status(200).json(ticket);
  } catch (error) {
    console.error('Error selling ticket:', error.message);
    res.status(500).json({ message: 'Error selling ticket', error: error.message });
  }
};

// Update a ticket
const updateTicket = async (req, res) => {
  const { id } = req.params;
  const { eventId, type, price, quantity } = req.body;
  console.log(`Updating ticket with ID: ${id} and data:`, req.body);
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(
      id,
      { eventId, type, price, quantity },
      { new: true }
    );
    if (!updatedTicket) {
      console.log('Ticket not found');
      return res.status(404).json({ message: 'Ticket not found' });
    }
    console.log('Ticket updated successfully:', updatedTicket);
    res.status(200).json(updatedTicket);
  } catch (error) {
    console.error('Error updating ticket:', error.message);
    res.status(500).json({ message: 'Error updating ticket', error: error.message });
  }
};

// Delete a ticket
const deleteTicket = async (req, res) => {
  const { id } = req.params;
  console.log(`Deleting ticket with ID: ${id}`);
  try {
    const deletedTicket = await Ticket.findByIdAndDelete(id);
    if (!deletedTicket) {
      console.log('Ticket not found');
      return res.status(404).json({ message: 'Ticket not found' });
    }
    console.log('Ticket deleted successfully:', deletedTicket);
    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    console.error('Error deleting ticket:', error.message);
    res.status(500).json({ message: 'Error deleting ticket', error: error.message });
  }
};

module.exports = {
  getTickets,
  createTicket,
  sellTicket,
  updateTicket,
  deleteTicket,
};
