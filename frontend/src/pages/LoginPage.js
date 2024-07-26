import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import Loading from "../components/Loading";
import { login as loginService } from "../services/authService";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await loginService(formData);
      if (data.role === "instructor") {
        navigate("/instructor/course", { replace: true });
      } else if (data.role === "student") {
        navigate("student/course", { replace: true });
      }
      if (data.token !== null) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.id);
        console.log("userId: " + data.id);
      } else {
        console.error("Login failed:", data.message);
      }
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
              {error && <p className="error-message">{error}</p>}
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
