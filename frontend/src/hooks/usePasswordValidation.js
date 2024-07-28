import { useState } from "react";

const usePasswordValidation = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

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

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const error = validatePassword(newPassword);
    setPasswordError(error);
  };

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
