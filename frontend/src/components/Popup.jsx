import React from 'react';
import PropTypes from 'prop-types';
import '../index.css';

const Popup = ({ title, children, buttonText, onButtonClick, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-header">
          <h2>{title}</h2>
          <button className="popup-close" onClick={onClose}>×</button>
        </div>
        <div className="popup-body">
          {children}
        </div>
        <div className="popup-footer">
          <button className="popup-button" onClick={onButtonClick}>{buttonText}</button>
        </div>
      </div>
    </div>
  );
};

Popup.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  buttonText: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func,
  onClose: PropTypes.func.isRequired,
};

Popup.defaultProps = {
  onButtonClick: () => {},
};

export default Popup;