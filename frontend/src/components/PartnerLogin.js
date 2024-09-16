import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../css/PartnerLogin.css'; // Adjust this path as per your CSS file location

const PartnerLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(`Updated ${name}:`, value); // Log each change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData); // Log form data on submit
    try {
      console.log('Making POST request to the server...');
      const response = await axios.post('http://localhost:5000/api/partner/login', formData);
      console.log('Response from server:', response.data); // Log response data
      localStorage.setItem('token', response.data.token); // Store the token in localStorage
      console.log('Token saved to localStorage:', response.data.token); // Log token
      
      Swal.fire({
        title: 'Success!',
        text: 'You have successfully logged in.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/PartnerMenu'); // Redirect to partner dashboard after successful login
        }
      });
    } catch (error) {
      console.error('Error logging in:', error.message);
      if (error.response) {
        console.error('Response error data:', error.response.data); // Log response error data
        Swal.fire({
          title: 'Error!',
          text: error.response.data.msg || 'An error occurred while logging in.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      } else if (error.request) {
        console.error('Request error data:', error.request); // Log request error data
        Swal.fire({
          title: 'Error!',
          text: 'No response from server. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      } else {
        console.error('Error message:', error.message); // Log error message
        Swal.fire({
          title: 'Error!',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
      // Handle error state or display error message to user
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Partner Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="login-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="login-input"
        />
        <button type="submit" className="login-button">Login</button>
      </form>
      <div className="register-link-container">
        <p>Don't have an account? <Link to="/partner-registration" className="register-link">Register here</Link></p>
      </div>
    </div>
  );
};

export default PartnerLogin;
