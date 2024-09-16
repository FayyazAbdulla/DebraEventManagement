import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AdminMenu.css';

const AdminMenu = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      navigate("/AdminLogin");
    }
  }, [navigate]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="admin-menu-container">
      <h1 className="admin-menu-title">Admin Menu</h1>
      <div className="admin-menu-buttons">
        <button
          className="admin-menu-button"
          onClick={() => handleNavigation('/ticket-management')}
        >
          Ticket Management
        </button>
        <button
          className="admin-menu-button"
          onClick={() => handleNavigation('/DebraAdminDashboard')}
        >
          Admin Dashboard
        </button>
      </div>
    </div>
  );
};

export default AdminMenu;
