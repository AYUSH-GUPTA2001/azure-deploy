// Navbar.js
import React, { useState } from 'react';
import './Navbar.css';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom/dist';
export default function Navbar(props) {
    const navigate=useNavigate()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)



    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

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
      <div onClick={()=>{toggleDropdown()}} className="welcome-message">
        <Tooltip title='logout'>Welcome, <span className='dot1'>{props.firstName}</span></Tooltip>
        
      </div>
      {isDropdownOpen && (
          <div onClick={handleLogout} className="dropdown">
            <ul>
              <li >Logout</li>
              {/* Add other options as needed */}
            </ul>
          </div>)}
    </div>
  </nav>
  );
}
