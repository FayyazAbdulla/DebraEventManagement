// components/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navigation.css';

const Navigation = () => {
  return (
    <nav className="navigation">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/register">Partner Registration</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;
