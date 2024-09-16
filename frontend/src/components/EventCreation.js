import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../css/EventCreation.css';

const EventCreation = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    location: '',
    partnerId: '', // Assuming partnerId needs to be captured
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);

    try {
      console.log('Making POST request to the server...');
      const response = await axios.post('http://localhost:5000/api/events/create', formData);
      console.log('Response from server:', response);

      if (response.status === 200) {
        console.log('Event created successfully. Response data:', response.data);

        Swal.fire({
          icon: 'success',
          title: 'Event Created',
          text: 'Your event has been created successfully!',
        });

        // Clear form after successful submission (optional)
        setFormData({
          name: '',
          date: '',
          location: '',
          partnerId: '',
        });
      } else {
        console.error('Failed to create event. Status:', response.status);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to create event. Please try again later.',
        });
      }
    } catch (error) {
      console.error('Error creating event:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while creating the event. Please try again.',
      });

      if (error.response) {
        console.error('Response error data:', error.response.data);
      } else if (error.request) {
        console.error('Request error data:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    }
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <h2>Create Event</h2>
      <input
        type="text"
        name="name"
        placeholder="Event Name"
        value={formData.name}
        onChange={handleChange}
        className="form-input"
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="form-input"
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        className="form-input"
      />
      <input
        type="text"
        name="partnerId"
        placeholder="Partner ID"
        value={formData.partnerId}
        onChange={handleChange}
        className="form-input"
      />
      <button type="submit" className="submit-button">Create Event</button>
    </form>
  );
};

export default EventCreation;
