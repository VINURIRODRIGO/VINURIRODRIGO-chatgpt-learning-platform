import React from 'react';
import PropTypes from 'prop-types';

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