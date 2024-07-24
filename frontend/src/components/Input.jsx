import React from 'react';
import '../index.css';

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