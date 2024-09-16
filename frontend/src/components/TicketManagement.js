import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/TicketManagement.css';

const TicketManagement = () => {
  const [tickets, setTickets] = useState([]);
  const [ticketData, setTicketData] = useState({
    eventId: '',
    type: '',
    price: '',
    quantity: '',
  });
  const [editTicketData, setEditTicketData] = useState(null);
  const [ticketId, setTicketId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        console.log('Fetching tickets from http://localhost:5000/api/tickets');
        const response = await axios.get('http://localhost:5000/api/tickets');
        console.log('Tickets fetched successfully:', response.data);
        setTickets(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tickets:', error.message);
        setError(error.message);
        setLoading(false);
      } 
    };

    fetchTickets();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketData({ ...ticketData, [name]: value });
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    try {
      console.log('Creating ticket with data:', ticketData);
      const response = await axios.post('http://localhost:5000/api/tickets/create', ticketData);
      console.log('Ticket created successfully:', response.data);
      setTickets([...tickets, response.data]);
      setTicketData({ eventId: '', type: '', price: '', quantity: '' });
    } catch (error) {
      console.error('Error creating ticket:', error.message);
      setError(error.message);
    }
  };

  const handleSellTicket = async (e) => {
    e.preventDefault();
    try {
      console.log(`Selling ticket with ID: ${ticketId}`);
      const response = await axios.post(`http://localhost:5000/api/tickets/sell/${ticketId}`);
      console.log('Ticket sold successfully:', response.data);
      const updatedTickets = tickets.map(ticket => 
        ticket._id === ticketId ? { ...ticket, ...response.data } : ticket
      );
      setTickets(updatedTickets);
      setTicketId('');
    } catch (error) {
      console.error('Error selling ticket:', error.message);
      setError(error.message);
    }
  };

  const handleDeleteTicket = async (ticketId) => {
    try {
      console.log(`Deleting ticket with ID: ${ticketId}`);
      await axios.delete(`http://localhost:5000/api/tickets/${ticketId}`);
      console.log('Ticket deleted successfully');
      setTickets(tickets.filter(ticket => ticket._id !== ticketId));
    } catch (error) {
      console.error('Error deleting ticket:', error.message);
      setError(error.message);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditTicketData({ ...editTicketData, [name]: value });
  };

  const handleUpdateTicket = async (e) => {
    e.preventDefault();
    try {
      console.log(`Updating ticket with ID: ${editTicketData._id} and data:`, editTicketData);
      const response = await axios.put(`http://localhost:5000/api/tickets/${editTicketData._id}`, editTicketData);
      console.log('Ticket updated successfully:', response.data);
      const updatedTickets = tickets.map(ticket =>
        ticket._id === editTicketData._id ? response.data : ticket
      );
      setTickets(updatedTickets);
      setEditTicketData(null);
    } catch (error) {
      console.error('Error updating ticket:', error.message);
      setError(error.message);
    }
  };

  if (loading) {
    return <div className="ticket-management-container"><p>Loading data...</p></div>;
  }

  if (error) {
    return <div className="ticket-management-container"><p>Error fetching data: {error}</p></div>;
  }

  return (
    <div className="ticket-management-container">
      <h2>Ticket Management</h2>

      <div className="ticket-management-grid">
        {/* Add Ticket Form */}
        <div className="ticket-container">
          <h3>Create Ticket</h3>
          <form onSubmit={handleCreateTicket}>
            <input type="text" name="eventId" placeholder="Event ID" value={ticketData.eventId} onChange={handleChange} required />
            <input type="text" name="type" placeholder="Ticket Type" value={ticketData.type} onChange={handleChange} required />
            <input type="number" name="price" placeholder="Price" value={ticketData.price} onChange={handleChange} required />
            <input type="number" name="quantity" placeholder="Quantity" value={ticketData.quantity} onChange={handleChange} required />
            <button type="submit">Create Ticket</button>
          </form>
        </div>

        {/* Sell Ticket Form */}
        <div className="ticket-container">
          <h3>Sell Ticket</h3>
          <form onSubmit={handleSellTicket}>
            <input type="text" placeholder="Ticket ID" value={ticketId} onChange={(e) => setTicketId(e.target.value)} required />
            <button type="submit">Sell Ticket</button>
          </form>
        </div>

        {/* Ticket List */}
        <div className="ticket-container">
          <h3>Ticket List</h3>
          <div className="ticket-list">
            {tickets.map((ticket) => (
              <div key={ticket._id} className="ticket-item">
                <h4>{ticket.type}</h4>
                <p>Event ID: {ticket.eventId}</p>
                <p>Price: ${ticket.price}</p>
                <p>Quantity: {ticket.quantity}</p>
                <p>Sold: {ticket.sold}</p>
                <div className="ticket-actions">
                  <button onClick={() => setEditTicketData(ticket)}>Edit</button>
                  <button onClick={() => handleDeleteTicket(ticket._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketManagement;
