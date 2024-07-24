import React from 'react';
import { Link, useNavigate   } from 'react-router-dom';
import '../index.css';

const Navbar = () => {
    const history = useNavigate();

    const handleLogout = () => {
      // Perform the logout logic, e.g., clearing tokens, making API call, etc.
      localStorage.removeItem('authToken'); //Remove auth token from localStorage
      history.push('/login');
    };
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">E-Learning</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/courses">Courses</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;