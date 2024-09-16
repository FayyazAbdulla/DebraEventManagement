import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import '../css/PartnerRegistration.css';

const PartnerRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/partner_register', formData);
      console.log('POST request successful. Response data:', response.data);
 
      Swal.fire({
        title: 'Success!',
        text: 'Partner registered successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/PartnerLogin'); // Use navigate to redirect
        }
      });
    } catch (error) {
      console.error('Error registering partner:', error);
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
    <div className="registration-container">
      <form className="partner-form" onSubmit={handleSubmit}>
        <h2>Partner Registration</h2>
        <input 
          type="text" 
          name="name" 
          placeholder="Name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
          className="form-input"
        />
        <input 
          type="email"  
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
          className="form-input"
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={handleChange} 
          required 
          className="form-input"
        />
        <div className="login-link-container">
        <p>Already have an account? <Link to="/PartnerLogin" className="login-link">Log in here</Link></p>
      </div>
        <button type="submit" className="submit-button">Register</button>
      </form>
      
    </div>
  );
};

export default PartnerRegistration;
