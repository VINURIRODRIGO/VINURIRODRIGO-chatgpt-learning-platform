import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
import Button from "../components/Button";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
import { instructorSignup } from "../services/authService";
import usePasswordValidation from "../hooks/usePasswordValidation";
import { useNavigate } from "react-router-dom";

/**
 * Instructor Signup Page
 *
 * Allows instructors to sign up by providing their details.
 * This component handles form input, validation, and submission.
 */
const InstructorSignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    teachingExperience: "Less than 1 year",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Custom hook for password validation
  const {
    password,
    confirmPassword,
    passwordMismatch,
    passwordStrength,
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

  // Options for teaching experience dropdown
  const experience = [
    { value: "Less than 1 year", label: "Less than 1 year" },
    { value: "1 to 3 years", label: "1 to 3 years" },
    { value: "3 to 5 years", label: "3 to 5 years" },
    { value: "5 to 10 years", label: "5 to 10 years" },
    { value: "More than 10 years", label: "More than 10 years" },
  ];

  /**
   * Handles teaching experience dropdown change.
   * @param {string} selectedRole - The selected teaching experience.
   */
  const handleRoleChange = (selectedRole) => {
    setFormData((prevData) => ({
      ...prevData,
      teachingExperience: selectedRole,
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

    if (passwordMismatch) {
      setError("Passwords do not match.");
      return;
    }

    if (passwordStrength !== "Password is strong.") {
      setError(passwordStrength);
      return;
    }

    setLoading(true);

    // API call for signup
    try {
      await instructorSignup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password,
        teachingExperience: formData.teachingExperience,
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
              <Dropdown
                label="Teaching Experience"
                options={experience}
                selectedOption={formData.teachingExperience}
                onSelect={handleRoleChange}
              />
              {passwordMismatch && (
                <Alert
                  message={passwordMismatch}
                  type="error"
                  onClose={() => {}}
                />
              )}
              {passwordStrength &&
                passwordStrength !== "Password is strong." && (
                  <p className="password-strength">{passwordStrength}</p>
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

export default InstructorSignupPage;
