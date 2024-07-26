import React from 'react';
import PropTypes from 'prop-types';
import '../index.css';

const Alert = ({ type, message, onClose }) => {
  const alertClasses = `alert alert-${type}`;

  return (
    <div className={alertClasses}>
      <span>{message}</span>
      {onClose && (
        <button className="alert-close-btn" onClick={onClose}>
          &times;
        </button>
      )}
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']).isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

export default Alert;