import { useState } from "react";

const usePasswordValidation = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    validatePassword(password, e.target.value);
  };

  const validatePassword = (password, confirmPassword) => {
    if (password && confirmPassword && password !== confirmPassword) {
      setPasswordMismatch("Passwords do not match.");
    } else {
      setPasswordMismatch("");
    }
  };

  return {
    password,
    confirmPassword,
    passwordMismatch,
    handlePasswordChange,
    handleConfirmPasswordChange,
  };
};

export default usePasswordValidation;