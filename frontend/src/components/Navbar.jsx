import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';

const Navbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const getHomeLink = () => {
    if (role === "instructor") {
      return "/instructor/course";
    } else if (role === "student") {
      return "/student/course";
    }
    return "/";
  };

  const getCourseLink = () => {
    if (role === "instructor") {
      return "/instructor/student-enroll-details";
    } else if (role === "student") {
      return "/student/course-list";
    }
    return "/";
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span>E-Learning</span>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to={getHomeLink()}>Home</Link>
        </li>
        <li>
          <Link to={getCourseLink()}>My Courses</Link>
        </li>
        <li className="username-container">
          <span className="username" onClick={toggleDropdown}>{username}</span>
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