import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PartnerRegistration from "./components/PartnerRegistration";
import PartnerLogin from './components/PartnerLogin';
import EventCreation from "./components/EventCreation";
import TicketManagement from "./components/TicketManagement";
import Home from "./components/Home";
import PartnerDashboard from "./components/PartnerDashboard";
import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin";
import AdminMenu from "./components/AdminMenu";
import PartnerMenu from "./components/PartnerMenu";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/partner-registration" element={<PartnerRegistration />} />
          <Route path="/event-creation" element={<EventCreation />} />
          <Route path="/ticket-management" element={<TicketManagement />} />
          <Route path="/PartnerDashboard" element={<PartnerDashboard />} />
          <Route path="/DebraAdminDashboard" element={<AdminDashboard />} />
          <Route path="/PartnerLogin" element={<PartnerLogin />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/AdminMenu" element={<AdminMenu />} />
          <Route path="/PartnerMenu" element={<PartnerMenu />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
