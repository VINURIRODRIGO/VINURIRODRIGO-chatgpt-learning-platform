import React from 'react';
import PropTypes from 'prop-types';
import '../index.css';

/**
 * Alert Component
 * 
 * A reusable alert component for displaying various types of messages.
 * 
 * @param {Object} props - The properties object.
 * @param {string} props.type - The type of alert (e.g., 'success', 'error', 'warning', 'info').
 * @param {string} props.message - The message to display in the alert.
 * @param {function} [props.onClose] - Optional. A callback function to handle the close event.
 * 
 * @returns {JSX.Element} The rendered alert component.
 */
const Alert = ({ type, message, onClose }) => {
  // Construct the CSS class for the alert based on the type
  const alertClasses = `alert alert-${type}`;

  return (
    <div className={alertClasses}>
      <span>{message}</span>
      {onClose && (
        <button className="alert-close-btn" onClick={onClose}>
          &times; {/* Unicode character for a multiplication sign used as a close button */}
        </button>
      )}
    </div>
  );
};

// PropTypes to enforce the types of props being passed to the Alert component
Alert.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']).isRequired, // The type of alert is required and must be one of the specified values
  message: PropTypes.string.isRequired, // The message to display in the alert is required and must be a string
  onClose: PropTypes.func, // Optional function to handle the close button click event
};

export default Alert;