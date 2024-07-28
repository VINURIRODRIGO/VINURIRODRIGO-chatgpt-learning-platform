import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Alert from './Alert';

/**
 * FileUpload Component
 * 
 * A reusable file upload component with customizable options and styling.
 * 
 * @param {Object} props - The properties object.
 * @param {Array<string>} props.fileTypes - The accepted file types for the upload.
 * @param {function} props.onFileChange - The function to call when files are selected.
 * @param {string} props.placeholder - Placeholder text to display when no file is selected.
 * @param {string} props.buttonImage - Optional image to display on the button.
 * @param {string} props.buttonText - Optional text to display on the button.
 * @param {string} props.className - Additional CSS classes for styling the component.
 * @param {string} props.fileName - The name of the selected file.
 * 
 * @returns {JSX.Element} The rendered file upload component.
 */
const FileUpload = ({ fileTypes, onFileChange, placeholder, buttonImage, buttonText, className, fileName }) => {
  const [error, setError] = useState('');

  // Handle file selection change
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const acceptedFiles = selectedFiles.filter(file => fileTypes.includes(file.type));
    
    if (acceptedFiles.length !== selectedFiles.length) {
      setError('Some files were not accepted. Only select files of the allowed types.');
    } else {
      setError('');
    }

    if (onFileChange) {
      onFileChange(acceptedFiles);
    }
  };

  // Format the file name to display
  const formatFileName = (name) => {
    if (!name) return '';
    const parts = name.split('.');
    const extension = parts.pop();
    const baseName = parts.join('.');
    if (baseName.length > 9) {
      return` ${baseName.substring(0, 9)}...${extension}`;
    }
    return name;
  };

  return (
    <div className={`file-upload ${className}`}>
      {error && <Alert type="error" message={error} onClose={() => setError('')} />}
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

// PropTypes to enforce the types of props being passed to the FileUpload component
FileUpload.propTypes = {
  fileTypes: PropTypes.arrayOf(PropTypes.string).isRequired, // Array of accepted file types
  onFileChange: PropTypes.func.isRequired, // Function to handle file change event
  placeholder: PropTypes.string, // Placeholder text for the file input
  buttonImage: PropTypes.string, // Optional image for the upload button
  buttonText: PropTypes.string, // Optional text for the upload button
  className: PropTypes.string, // Additional CSS classes for styling
  fileName: PropTypes.string, // Name of the selected file
};

// Default props for the FileUpload component
FileUpload.defaultProps = {
  placeholder: 'Choose file',
  buttonImage: '',
  buttonText: '',
  className: '',
  fileName: '',
};

export default FileUpload;