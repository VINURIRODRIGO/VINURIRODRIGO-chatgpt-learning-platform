import React, { useState } from "react";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import Loading from "../components/Loading";
import { login } from "../services/authService";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      const data = await login(formData);
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
          </Card>
        </div>
      )}
    </div>
  );
};

export default Login;