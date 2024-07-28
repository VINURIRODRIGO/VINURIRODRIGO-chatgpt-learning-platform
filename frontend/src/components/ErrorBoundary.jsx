import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

class ErrorBoundary extends React.Component {

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
        console.log("ERROR: " + this.state.error)
      return (
        <div className="error-boundary">
          <h1>Something went wrong.</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>{this.state.error && this.state.error.toString()}</p>
          <Link to="/">Go to Home</Link>
        </div>
      );
    } 
    return this.props.children;
  }
}

export default ErrorBoundary;