import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js"

function AuthPage() {
  const navigate = useNavigate();

  const [formType, setFormType] = useState("signup"); // 'signup', 'verifySignup', 'login', 'verifyLogin'
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    otp: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Signup or Login Request
  const handleAuthRequest = async (e) => {
    e.preventDefault();
    try {
      const endpoint = formType === "signup" ? "/api/auth/signup" : "/api/auth/login";
      const payload = formType === "signup"
        ? { username: formData.username, email: formData.email }
        : { email: formData.email };

      const response = await api.post(endpoint, payload);

      if (response.data.success) {
        setMessage(response.data.message || "OTP sent to your email.");
        setFormType(formType === "signup" ? "verifySignup" : "verifyLogin");
        setError("");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
      setMessage("");
    }
  };

  // Verify OTP for Signup or Login
  const handleOTPVerification = async (e) => {
    e.preventDefault();
    try {
      const endpoint = formType === "verifySignup" ? "/api/auth/verify-signup" : "/api/auth/verify-login";
      const payload = { email: formData.email, otp: formData.otp };

      const response = await api.post(endpoint, payload);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token); // Save token
        navigate("/dashboard"); // Redirect to the dashboard
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP.");
      setMessage("");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", textAlign: "center" }}>
      <h1>
        {formType === "signup"
          ? "Sign Up"
          : formType === "verifySignup"
          ? "Verify Signup"
          : formType === "login"
          ? "Log In"
          : "Verify Login"}
      </h1>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={formType === "signup" || formType === "login" ? handleAuthRequest : handleOTPVerification}>
        {formType === "signup" && (
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
        )}
        {(formType === "signup" || formType === "login" || formType.includes("verify")) && (
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        )}
        {formType.includes("verify") && (
          <div>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <button type="submit" style={{ marginTop: "20px" }}>
          {formType === "signup"
            ? "Sign Up"
            : formType === "login"
            ? "Log In"
            : "Verify"}
        </button>
      </form>

      <div style={{ marginTop: "20px" }}>
        {formType === "signup" && (
          <p>
            Already have an account?{" "}
            <span onClick={() => setFormType("login")} style={{ cursor: "pointer", color: "blue" }}>
              Log In
            </span>
          </p>
        )}
        {formType === "login" && (
          <p>
            Don't have an account?{" "}
            <span onClick={() => setFormType("signup")} style={{ cursor: "pointer", color: "blue" }}>
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default AuthPage;