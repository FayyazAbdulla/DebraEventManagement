import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import "../css/AdminLogin.css";

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with username:', username, 'and password:', password);
    
    try {
      console.log('Sending login request to server...');
      const response = await axios.post('http://localhost:5000/api/debra/admin_login', { username, password });
      console.log('Login successful:', response.data);
      
      localStorage.setItem('adminToken', response.data.token);
      
      Swal.fire({
        title: 'Success!',
        text: 'You have successfully logged in.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/AdminMenu'); // Navigate to Admin Dashboard after successful login
      });
      
    } catch (error) {
      console.error('Error logging in:', error.message);
      Swal.fire({
        title: 'Error!',
        text: 'Login failed. Please check your credentials.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
    }
  };

  return (
    <div className="admin-login-container">
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <h2>Debra Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
