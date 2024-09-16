// AdminDashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchPartners,
  addPartner,
  updatePartner,
  deletePartner,
  fetchEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  fetchTicketSales,
  fetchDashboardMetrics,
} from "../services/api";
import Swal from "sweetalert2";
import "../css/AdminDashboard.css";

const AdminDashboard = () => {
  const [partners, setPartners] = useState([]);
  const [events, setEvents] = useState([]);
  const [ticketSales, setTicketSales] = useState({ _id: null, totalSales: 0 });  const [metrics, setMetrics] = useState({
    partnerCount: 0,
    eventCount: 0,
    totalSales: 0,
  });
  const [newPartner, setNewPartner] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [editingPartner, setEditingPartner] = useState(null);
  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    location: "",
  });
  const [editingEvent, setEditingEvent] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0); // State to track elapsed time
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      navigate("/AdminLogin");
      return;
    }

    const interval = setInterval(() => {
      setTimeElapsed((prevTimeElapsed) => prevTimeElapsed + 1);
    }, 1000); // Update timeElapsed every second

    const fetchData = async () => {
      try {
        const partnersResponse = await fetchPartners();
        setPartners(partnersResponse.data);

        const eventsResponse = await fetchEvents();
        setEvents(eventsResponse.data);

        const ticketSalesResponse = await fetchTicketSales();
        console.log("Fetched ticket sales:", ticketSalesResponse.data);
        setTicketSales(ticketSalesResponse.data);

        const metricsResponse = await fetchDashboardMetrics();
        setMetrics(metricsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Error fetching data: ${error.message}`,
        });
      }
    };

    fetchData();

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [navigate]);

  const handleAddPartner = async () => {
    try {
      const response = await addPartner(newPartner);
      setPartners([...partners, response.data]);
      setNewPartner({ name: "", email: "", password: "" });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Partner added successfully",
      });
    } catch (error) {
      console.error("Error adding partner:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error adding partner: ${error.message}`,
      });
    }
  };

  const handleUpdatePartner = async (partnerId) => {
    try {
      const response = await updatePartner(partnerId, editingPartner);
      const updatedPartners = partners.map((partner) =>
        partner._id === partnerId ? response.data : partner
      );
      setPartners(updatedPartners);
      setEditingPartner(null);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Partner updated successfully",
      });
    } catch (error) {
      console.error("Error updating partner:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error updating partner: ${error.message}`,
      });
    }
  };

  const handleDeletePartner = async (partnerId) => {
    try {
      await deletePartner(partnerId);
      const updatedPartners = partners.filter(
        (partner) => partner._id !== partnerId
      );
      setPartners(updatedPartners);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Partner deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting partner:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error deleting partner: ${error.message}`,
      });
    }
  };

  const handleAddEvent = async () => {
    try {
      const response = await addEvent(newEvent);
      setEvents([...events, response.data]);
      setNewEvent({ name: "", date: "", location: "" });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Event added successfully",
      });
    } catch (error) {
      console.error("Error adding event:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error adding event: ${error.message}`,
      });
    }
  };

  const handleUpdateEvent = async (eventId) => {
    try {
      const response = await updateEvent(eventId, editingEvent);
      const updatedEvents = events.map((event) =>
        event._id === eventId ? response.data : event
      );
      setEvents(updatedEvents);
      setEditingEvent(null);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Event updated successfully",
      });
    } catch (error) {
      console.error("Error updating event:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error updating event: ${error.message}`,
      });
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteEvent(eventId);
      const updatedEvents = events.filter((event) => event._id !== eventId);
      setEvents(updatedEvents);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Event deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting event:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error deleting event: ${error.message}`,
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    Swal.fire({
      icon: "info",
      title: "Logged Out",
      text: "You have been logged out successfully",
    }).then(() => {
      navigate("/AdminLogin");
    });
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  return (
    <div className="admin-dashboard-container">
      <div className="logout-timer-container">
        <p className="timer-box">Logged in for: {formatTime(timeElapsed)}</p>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <h2>Debra Admin Dashboard</h2>
      <div className="dashboard-metrics">
        <p>Total Partners: {metrics.partnerCount}</p>
        <p>Total Events: {metrics.eventCount}</p>
        <p>Total Tickets Sold: {metrics.totalSales}</p>
      </div>

      <div className="partners-section">
        <h3>Partners</h3>
        <div className="add-partner-form">
          <input
            type="text"
            placeholder="Name"
            value={newPartner.name}
            onChange={(e) =>
              setNewPartner({ ...newPartner, name: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            value={newPartner.email}
            onChange={(e) =>
              setNewPartner({ ...newPartner, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            value={newPartner.password}
            onChange={(e) =>
              setNewPartner({ ...newPartner, password: e.target.value })
            }
          />
          <button onClick={handleAddPartner}>Add Partner</button>
        </div>
        <div className="partners-list">
          {partners.map((partner) => (
            <div key={partner._id} className="partner-item">
              {editingPartner && editingPartner._id === partner._id ? (
                <div>
                  <input
                    type="text"
                    value={editingPartner.name}
                    onChange={(e) =>
                      setEditingPartner({
                        ...editingPartner,
                        name: e.target.value,
                      })
                    }
                  />
                  <input
                    type="email"
                    value={editingPartner.email}
                    onChange={(e) =>
                      setEditingPartner({
                        ...editingPartner,
                        email: e.target.value,
                      })
                    }
                  />
                  <button onClick={() => handleUpdatePartner(partner._id)}>
                    Save
                  </button>
                  <button onClick={() => setEditingPartner(null)}>
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <p>Name: {partner.name}</p>
                  <p>Email: {partner.email}</p>
                  <button onClick={() => setEditingPartner(partner)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeletePartner(partner._id)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="events-section">
        <h3>Events</h3>
        <div className="add-event-form">
          <input
            type="text"
            placeholder="Name"
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
          />
          <input
            type="date"
            placeholder="Date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          />
          <input
            type="text"
            placeholder="Location"
            value={newEvent.location}
            onChange={(e) =>
              setNewEvent({ ...newEvent, location: e.target.value })
            }
          />
          <button onClick={handleAddEvent}>Add Event</button>
        </div>
        <div className="events-list">
          {events.map((event) => (
            <div key={event._id} className="event-item">
              {editingEvent && editingEvent._id === event._id ? (
                <div>
                  <input
                    type="text"
                    value={editingEvent.name}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        name: e.target.value,
                      })
                    }
                  />
                  <input
                    type="date"
                    value={editingEvent.date}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        date: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    value={editingEvent.location}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        location: e.target.value,
                      })
                    }
                  />
                  <button onClick={() => handleUpdateEvent(event._id)}>
                    Save
                  </button>
                  <button onClick={() => setEditingEvent(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <p>Name: {event.name}</p>
                  <p>Date: {event.date}</p>
                  <p>Location: {event.location}</p>
                  <button onClick={() => setEditingEvent(event)}>Edit</button>
                  <button onClick={() => handleDeleteEvent(event._id)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="ticket-sales-section">
        <h3>Ticket Sales</h3>
        <p>Total Tickets Sold: {ticketSales.totalSales}</p>
      </div>

      {/* <div className="ticket-sales-section">
        <h3>Ticket Sales</h3>
        {ticketSales.length > 0 ? (
          <ul className="ticket-sales-list">
            {ticketSales.map((sale) => (
              <li key={sale._id}>
                <p>{sale.event.name}</p>
                <p>{sale.partner.name}</p>
                <p>{sale.quantity} tickets</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No ticket sales available.</p>
        )}
      </div> */}
    </div>
  );
};

export default AdminDashboard;
