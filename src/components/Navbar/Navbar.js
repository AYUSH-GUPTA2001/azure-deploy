// Navbar.js
import React from 'react';
import './Navbar.css';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom/dist';
export default function Navbar(props) {
    const navigate=useNavigate()
    const handleLogout=()=>{
        if(props.user==='client'){
            navigate('/investor')
        }
        else{
            navigate('/advisor')
        }
    }
  return (
    <nav className='nav'>
    <div className="navbar-content">
      <h1 id="logo">
        <span className="logo-text">INCvest</span>
        <span className="dot">.</span>
      </h1>
      <div onClick={handleLogout}className="welcome-message"><Tooltip title='logout'>Welcome, <span className='dot1'>{props.firstName}</span></Tooltip></div>
    </div>
  </nav>
  );
}
