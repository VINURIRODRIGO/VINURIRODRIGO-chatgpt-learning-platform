import React from 'react';
import '../index.css';

/**
 * Dropdown Component
 * 
 * A reusable dropdown component for selecting an option from a list.
 * 
 * @param {Object} props - The properties object.
 * @param {Array<{value: string, label: string}>} props.options - The list of options for the dropdown.
 * @param {string} props.selectedOption - The currently selected option.
 * @param {function} props.onSelect - The function to call when an option is selected.
 * @param {string} props.label - The label to display above the dropdown.
 * 
 * @returns {JSX.Element} The rendered dropdown component.
 */
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