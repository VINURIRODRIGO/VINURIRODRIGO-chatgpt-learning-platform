import React from 'react';
import '../index.css'; 

function Button({ onClick, children, type = 'button', className = '', disabled = false }) {
  return (
    <button
      type={type}
      className={`button ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;