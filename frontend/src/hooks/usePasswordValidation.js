import { useState } from "react";

/**
 * Custom hook for password validation and state management.
 *
 * @returns {Object} The state and handlers for password and confirmation password.
 */
const usePasswordValidation = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  /**
   * Validates the given password against defined rules.
   *
   * @param {string} password - The password to validate.
   * @returns {string} Error message if validation fails, otherwise an empty string.
   */
  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Password should be at least 8 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password should contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
      return "Password should contain at least one lowercase letter.";
    }
    if (!/[0-9]/.test(password)) {
      return "Password should contain at least one number.";
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return "Password should contain at least one special character.";
    }
    return "";
  };

  /**
   * Handles password input change and sets validation error.
   *
   * @param {Event} e - The change event.
   */
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const error = validatePassword(newPassword);
    setPasswordError(error);
  };

  /**
   * Handles confirmation password input change.
   *
   * @param {Event} e - The change event.
   */
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  return {
    password,
    confirmPassword,
    passwordError,
    handlePasswordChange,
    handleConfirmPasswordChange,
  };
};

export default usePasswordValidation;
