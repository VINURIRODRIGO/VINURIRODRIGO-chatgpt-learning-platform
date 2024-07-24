import React from 'react';
import '../index.css'; 

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p style={{color: 'white'}}>{message}</p>
    </div>
  );
};

export default Loading;