import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPartnerEvents, fetchPartnerInfo, fetchSummaryStatistics } from '../services/api'; // Adjust API functions as per your backend setup
import "../css/PartnerDashboard.css";

const PartnerDashboard = () => {
  const [events, setEvents] = useState([]);
  const [partnerInfo, setPartnerInfo] = useState(null); // Start with null to explicitly check for its existence
  const [summaryStats, setSummaryStats] = useState({
    totalEvents: 0,
    totalTicketsSold: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/PartnerLogin');
          return;
        }

        // Fetch partner information
        const partnerResponse = await fetchPartnerInfo();
        setPartnerInfo(partnerResponse.data);

        // Fetch summary statistics
        const statsResponse = await fetchSummaryStatistics();
        setSummaryStats({
          totalEvents: statsResponse.totalEvents || 0,
          totalTicketsSold: statsResponse.totalTicketsSold || 0,
          totalRevenue: statsResponse.totalRevenue || 0,
        });

        // Fetch events
        const eventsResponse = await fetchPartnerEvents();
        setEvents(eventsResponse.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/PartnerLogin');
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      // Implement your delete event logic here
      // Example:
      // await deleteEvent(eventId);
      // Remove event from local state after successful delete
      setEvents(events.filter(event => event._id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error.message);
      // Handle error as needed
    }
  };

  if (loading) {
    return <div className="dashboard-container"><p>Loading data...</p></div>;
  }

  if (error) {
    return <div className="dashboard-container"><p>Error fetching data: {error}</p></div>;
  }

  return (
    <div className="dashboard-container">
      <h2>Partner Dashboard</h2>

      {/* Partner Information */}
      <div className="partner-info">
        <h3>Welcome, {partnerInfo?.name || 'Partner'}</h3>
        <button onClick={handleLogout}>Log Out</button>
      </div>

      {/* Summary Statistics */}
      <div className="summary-stats">
        <h3>Summary Statistics</h3>
        <p>Total Events: {summaryStats.totalEvents}</p>
        <p>Total Tickets Sold: {summaryStats.totalTicketsSold}</p>
        <p>Total Revenue: ${summaryStats.totalRevenue}</p>
      </div>

      {/* Event List */}
      <div className="events-list">
        <h3>Event List</h3>
        {events.map((event) => (
          <div key={event._id} className="event-item">
            <h4>{event.name}</h4>
            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
            <p>Location: {event.location}</p>
            <p>Tickets Sold: {event.ticketsSold}</p>
            <p>Revenue: ${event.revenue}</p>
            <div className="event-actions">
              <button onClick={() => navigate(`/events/${event._id}`)}>View Details</button>
              <button onClick={() => navigate(`/events/edit/${event._id}`)}>Edit Event</button>
              <button onClick={() => handleDeleteEvent(event._id)}>Delete Event</button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Event Button */}
      <div className="add-event">
        <button onClick={() => navigate('/event-creation')}>Add New Event</button>
      </div>
    </div>
  );
};

export default PartnerDashboard;
