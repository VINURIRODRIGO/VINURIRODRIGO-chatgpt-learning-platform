import React from 'react';
import PropTypes from 'prop-types';

const FileUpload = ({ fileTypes, onFileChange, placeholder, buttonImage, buttonText, className, fileName }) => {
  const handleFileChange = (event) => {
    if (onFileChange) {
      onFileChange(event.target.files);
    }
  };

  const formatFileName = (name) => {
    if (!name) return '';
    const parts = name.split('.');
    const extension = parts.pop();
    const baseName = parts.join('.');
    if (baseName.length > 9) {
      return `${baseName.substring(0, 9)}...${extension}`;
    }
    return name;
  };

  return (
    <div className={`file-upload ${className}`}>
      <input
        type="file"
        accept={fileTypes.join(', ')}
        onChange={handleFileChange}
        className="file-input"
      />
      <label className="file-label">
        {buttonImage && <img src={buttonImage} alt="Upload Icon" className="file-icon" />}
        <span className="file-text">{fileName ? formatFileName(fileName) : buttonText || placeholder || 'Choose file'}</span>
      </label>
    </div>
  );
};

FileUpload.propTypes = {
  fileTypes: PropTypes.arrayOf(PropTypes.string),
  onFileChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  buttonImage: PropTypes.string,
  buttonText: PropTypes.string,
  className: PropTypes.string,
  fileName: PropTypes.string,
};

FileUpload.defaultProps = {
  fileTypes: [],
  placeholder: 'Choose file',
  buttonImage: '',
  buttonText: '',
  className: '',
  fileName: '',
};

export default FileUpload;