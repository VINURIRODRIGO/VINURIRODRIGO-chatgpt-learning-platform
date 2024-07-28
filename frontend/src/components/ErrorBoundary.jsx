import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

/**
 * ErrorBoundary Component
 * 
 * A component to catch JavaScript errors anywhere in the child component tree, log those errors, and display a fallback UI.
 * 
 * @param {Object} props - The properties object.
 * 
 * @returns {JSX.Element} The rendered error boundary component.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null }; // Initialize state to track error
  }

  // Update state when an error is caught
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // Log error details
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Display fallback UI when an error is caught
      return (
        <div className="error-boundary">
          <h1>Something went wrong.</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>{this.state.error && this.state.error.toString()}</p>
          <Link to="/">Go to Home</Link>
        </div>
      );
    }
    return this.props.children; // Render child components if no error
  }
}

export default ErrorBoundary;