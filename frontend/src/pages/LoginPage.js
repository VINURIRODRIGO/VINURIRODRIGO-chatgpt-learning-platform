import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
import { login as loginService } from "../services/authService";
import { userDetails } from "../services/userService";

/**
 * Login Page
 * 
 * Handles user login functionality.
 */
const LoginPage = () => {
  // State to store form data, loading status, and error message
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  /**
   * handleChange updates formData state based on user input.
   * @param {object} e - The event object.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /**
   * handleSubmit handles the form submission for login.
   * @param {object} e - The event object.
   */
  const handleSubmit = async (e) => {
    // Prevent page refresh
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await loginService(formData);
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.id);
        localStorage.setItem("role", data.role);

        const user = await userDetails();
        const username = `${user.firstName} ${user.lastName}`;
        localStorage.setItem("username", username);

        // Navigate based on user role
        if (data.role === "instructor") {
          navigate("/instructor/course", { replace: true });
        } else if (data.role === "student") {
          navigate("/student/course", { replace: true });
        }
      } else {
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      setError(error || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * useEffect hook to clear error message after a timeout.
   */
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="signin-container">
      {loading ? (
        <Loading />
      ) : (
        <div className="card-container">
          <Card title="Sign In" content="Sign in to access your account">
            <form className="form" onSubmit={handleSubmit}>
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
                value={formData.password}
                onChange={handleChange}
              />
              <div className="button-center">
                <Button type="submit">Sign In</Button>
              </div>
              {error && (
                <Alert
                  message={error}
                  type="error"
                  onClose={() => setError("")}
                />
              )}
            </form>
            <div>
              <p>Don't have an account? Sign Up</p>
              <div>
                <Button
                  className="signup-options"
                  onClick={() => navigate("/student/signup", { replace: true })}
                >
                  Student
                </Button>
                <Button
                  className="signup-options"
                  onClick={() =>
                    navigate("/instructor/signup", { replace: true })
                  }
                >
                  Instructor
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LoginPage;