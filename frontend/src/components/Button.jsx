import React from 'react';
import '../index.css';

/**
 * Button Component
 * 
 * A reusable button component for various button types and actions.
 * 
 * @param {Object} props - The properties object.
 * @param {function} props.onClick - The function to call when the button is clicked.
 * @param {React.ReactNode} props.children - The content to display inside the button.
 * @param {string} [props.type='button'] - The type of the button (e.g., 'button', 'submit', 'reset').
 * @param {string} [props.className=''] - Additional CSS classes for styling the button.
 * @param {boolean} [props.disabled=false] - If true, the button is disabled.
 * 
 * @returns {JSX.Element} The rendered button component.
 */
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