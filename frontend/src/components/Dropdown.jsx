import React from 'react';
import '../index.css';

const Dropdown = ({ options, selectedOption, onSelect, label }) => {
  return (
    <div className="form-dropdown">
      {label && <label className="dropdown-label">{label}</label>}
      <select 
        value={selectedOption} 
        onChange={(e) => onSelect(e.target.value)}
        className="dropdown-select"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;