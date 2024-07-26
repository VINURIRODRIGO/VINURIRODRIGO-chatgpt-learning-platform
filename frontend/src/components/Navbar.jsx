import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';

const Navbar = () => {
  const navigate = useNavigate();
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">E-Learning</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="instructor/courses">Home</Link>
        </li>
        <li>
          <Link to="/courses">Courses</Link>
        </li>
        <li className="username-container">
          <span className="username" onClick={toggleDropdown}>{`${firstName} ${lastName}`}</span>
          {dropdownVisible && (
            <div className="logout-dropdown">
              <button className="logout-dropdown-item" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;