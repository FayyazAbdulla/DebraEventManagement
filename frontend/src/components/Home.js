import React from 'react';
import { Link } from 'react-router-dom';
import '../css/home.css'; // Ensure the CSS file name matches the import

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to Debra Event Management</h1>
        <p>Manage your events efficiently with Debra.</p>
        <div className="button-container">
          <Link to="/partner-registration" className="nav-button">Partner Registration</Link>
          <Link to="/PartnerLogin" className="nav-button">Partner Login</Link>
          <Link to="/AdminLogin" className="nav-button">Debra Admin Login</Link>
          {/* <Link to="/ticket-management" className="nav-button">Manage Tickets</Link> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
