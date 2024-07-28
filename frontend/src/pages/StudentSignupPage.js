import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
import { studentSignup } from "../services/authService";
import usePasswordValidation from "../hooks/usePasswordValidation";

/**
 * Student Signup Page
 *
 * Allows students to sign up by providing their details.
 * This component handles form input, validation, and submission.
 */
const StudentSignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Custom hook for password validation
  const {
    password,
    confirmPassword,
    passwordError,
    handlePasswordChange,
    handleConfirmPasswordChange,
  } = usePasswordValidation();

  /**
   * Handles input change for form fields.
   * @param {Event} e - The event object from the input change.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /**
   * Handles form submission for signup.
   * @param {Event} e - The event object from the form submission.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Form validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !password ||
      !confirmPassword
    ) {
      setError("All fields are required.");
      return;
    }

    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    // API call for signup
    try {
      await studentSignup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: password,
      });

      navigate("/", { replace: true });
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Automatically clear error after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  /**
   * Handles the cancel button click.
   */
  const handleCancel = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="signin-container">
      {loading ? (
        <Loading />
      ) : (
        <div className="card-container">
          <Card title="Sign Up" content="Create an account to get started.">
            <form className="form" onSubmit={handleSubmit}>
              <Input
                label="First Name"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              <Input
                label="Last Name"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {passwordError && (
                <Alert
                  message={passwordError}
                  type="error"
                  onClose={() => {}}
                />
              )}
              <div className="button-center">
                <Button type="button" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit">Sign Up</Button>
              </div>
              {error && (
                <Alert
                  message={error}
                  type="error"
                  onClose={() => setError("")}
                />
              )}
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default StudentSignupPage;
