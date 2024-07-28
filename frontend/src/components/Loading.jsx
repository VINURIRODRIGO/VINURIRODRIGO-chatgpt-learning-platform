import React from 'react';
import '../index.css'; 

/**
 * Loading Component
 * 
 * A simple loading spinner with a message.
 * 
 * @param {Object} props - The properties object.
 * @param {string} props.message - The loading message to display (default is "Loading...").
 * 
 * @returns {JSX.Element} The rendered loading component.
 */
const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p style={{color: 'white'}}>{message}</p>
    </div>
  );
};

export default Loading;