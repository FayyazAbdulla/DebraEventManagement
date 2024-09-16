import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/PartnerMenu.css";

const PartnerMenu = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/PartnerLogin");
      return;
    }
  }, [navigate]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="partner-menu-container">
      <h1 className="partner-menu-title">Partner Menu</h1>
      <div className="partner-menu-buttons">
        <button
          className="partner-menu-button"
          onClick={() => handleNavigation("/event-creation")}
        >
          Create Event
        </button>
        <button
          className="partner-menu-button"
          onClick={() => handleNavigation("/PartnerDashboard")}
        >
          Partner Dashboard
        </button>
      </div>
    </div>
  );
};

export default PartnerMenu;
