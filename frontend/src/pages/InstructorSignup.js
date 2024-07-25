import React, { useState } from "react";
import Card from "../components/Card";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
import Button from "../components/Button";
import Loading from "../components/Loading";
import { instructorSignup } from "../services/authService";
import usePasswordValidation from "../hooks/usePasswordValidation";
import { useNavigate } from "react-router-dom";

const InstructorSignup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    teachingExperience: "Less than 1 year",
  });
  const navigate = useNavigate();
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

  const experience = [
    { value: "Less than 1 year", label: "Less than 1 year" },
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
      setLoading(false);
      setError("Passwords do not match");
      return;
    }

    try {
      const data = await instructorSignup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password,
        teachingExperience: formData.teachingExperience,
      });
      console.log(data);
      navigate("instructor/course", { replace: true });
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
                label="Role"
                options={experience}
                selectedOption={formData.teachingExperience}
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
