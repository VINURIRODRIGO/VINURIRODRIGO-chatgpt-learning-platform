import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

/**
 * Error Page
 *
 * Displays a 404 error message when a page is not found.
 */
const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default ErrorPage;
