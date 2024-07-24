import React, { useState } from "react";
import Card from "../components/Card";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
import Button from "../components/Button";
import Loading from "../components/Loading";
import { signup } from "../services/authService";
import usePasswordValidation from "../hooks/usePasswordValidation";

const InstructorSignup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "Less than year",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    password,
    confirmPassword,
    passwordMismatch,
    handlePasswordChange,
    handleConfirmPasswordChange,
  } = usePasswordValidation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const roles = [
    { value: "Less than year", label: "Less than year" },
    { value: "1 to 3 years", label: "1 to 3 years" },
    { value: "3 to 5 years", label: "3 to 5 years" },
    { value: "5 to 10 years", label: "5 to 10 years" },
    { value: "More than 10 years", label: "More than 10 years" },
  ];

  const handleRoleChange = (selectedRole) => {
    setFormData((prevData) => ({
      ...prevData,
      role: selectedRole,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      return;
    }

    try {
      const data = await signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        password,
        role: formData.role,
      });
      console.log(data);
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred.");
    } finally {
      setLoading(false);
    }
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
                label="Role"
                options={roles}
                selectedOption={formData.role}
                onSelect={handleRoleChange}
              />
              {passwordMismatch && (
                <p className="error-message">{passwordMismatch}</p>
              )}
              <div className="button-center">
                <Button type="submit">Sign Up</Button>
              </div>
              {error && <p className="error-message">{error}</p>}
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default InstructorSignup;