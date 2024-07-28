import React from 'react';
import '../index.css';

/**
 * Input Component
 * 
 * A reusable input field component with a label.
 * 
 * @param {Object} props - The properties object.
 * @param {string} props.label - The label text for the input field.
 * @param {string} props.type - The type of the input field (e.g., text, password).
 * @param {string} props.name - The name attribute for the input field.
 * @param {string} props.value - The value of the input field.
 * @param {function} props.onChange - The function to call when the input value changes.
 * 
 * @returns {JSX.Element} The rendered input component.
 */
function Input({ label, type, name, value, onChange }) {
  return (
    <div className="input-group">
      <label htmlFor={name} className="input-label">{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="input-field"
      />
    </div>
  );
}

export default Input;