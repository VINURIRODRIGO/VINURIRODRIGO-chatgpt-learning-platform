import React from 'react';
import PropTypes from 'prop-types';

/**
 * Textarea Component
 * 
 * A reusable textarea component with customizable properties.
 * 
 * @param {Object} props - The properties object.
 * @param {string} props.value - The value of the textarea.
 * @param {function} props.onChange - The function to call when the textarea value changes.
 * @param {string} props.placeholder - The placeholder text for the textarea.
 * @param {string} props.name - The name attribute for the textarea.
 * @param {number} props.rows - The number of rows for the textarea.
 * @param {number} props.cols - The number of columns for the textarea.
 * @param {number} props.maxLength - The maximum length of the textarea value.
 * @param {string} props.className - Additional class names for styling the textarea.
 * 
 * @returns {JSX.Element} The rendered textarea component.
 */
const Textarea = ({ value, onChange, placeholder, name, rows, cols, maxLength, className }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      id={name}
      rows={rows}
      cols={cols}
      maxLength={maxLength}
      className={`textarea ${className}`}
    />
  );
};

Textarea.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  rows: PropTypes.number,
  cols: PropTypes.number,
  maxLength: PropTypes.number,
  className: PropTypes.string,
};

Textarea.defaultProps = {
  value: '',
  placeholder: '',
  name: '',
  rows: 4,
  cols: 50,
  maxLength: 500,
  className: '',
};

export default Textarea;