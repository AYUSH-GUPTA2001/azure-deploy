// Navbar.js
import React from 'react';
import './Navbar.css';

export default function Navbar(props) {
  return (
    <nav>
    <div className="navbar-content">
      <h1 id="logo">
        <span className="logo-text">INCvest</span>
        <span className="dot">.</span>
      </h1>
      <div className="welcome-message">Welcome, <span className='dot1'>{props.firstName}</span></div>
    </div>
  </nav>
  );
}
