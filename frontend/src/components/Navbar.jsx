import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';

/**
 * Navbar Component
 * 
 * A navigation bar component with dynamic links and a user dropdown menu.
 * 
 * @returns {JSX.Element} The rendered navbar component.
 */
const Navbar = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate
  const username = localStorage.getItem("username"); // Get username from local storage
  const role = localStorage.getItem("role"); // Get user role from local storage
  const [dropdownVisible, setDropdownVisible] = useState(false); // State to manage the visibility of the dropdown menu

  // Function to handle user logout
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  // Function to toggle the visibility of the dropdown menu
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // Function to determine the home link based on user role
  const getHomeLink = () => {
    if (role === "instructor") {
      return "/instructor/course";
    } else if (role === "student") {
      return "/student/course";
    }
    return "/";
  };

  // Function to determine the courses link based on user role
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