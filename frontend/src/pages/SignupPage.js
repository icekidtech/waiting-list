import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

function AuthPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [formType, setFormType] = useState("signup"); // 'signup', 'login', 'requestReset', 'confirmReset'
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    newPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Signup or Login
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = formType === "signup" ? "/api/signup" : "/api/login";
      const payload =
        formType === "signup"
          ? { username: formData.username, fullName: formData.fullName, email: formData.email, password: formData.password }
          : { email: formData.email, password: formData.password };
      const response = await axios.post(endpoint, payload);

      if (response.data.success) {
        if (formType === "login") {
          localStorage.setItem("token", response.data.token); // Save token
          navigate("/dashboard"); // Redirect
        } else {
          setMessage("Signup successful. Please log in.");
          setFormType("login");
        }
        setError("");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
      setMessage("");
    }
  };

  // Submit Password Reset Request
  const handleRequestReset = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/password-reset/request", { email: formData.email });
      setMessage(response.data.message);
      setError("");
      setFormType("login");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
      setMessage("");
    }
  };

  // Submit Password Reset Confirmation
  const handleConfirmReset = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/password-reset/confirm", { token, newPassword: formData.newPassword });
      setMessage(response.data.message);
      setError("");
      setFormType("login");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
      setMessage("");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", textAlign: "center" }}>
      <h1>
        {formType === "signup"
          ? "Sign Up"
          : formType === "login"
          ? "Log In"
          : formType === "requestReset"
          ? "Request Password Reset"
          : "Reset Password"}
      </h1>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form
        onSubmit={
          formType === "requestReset"
            ? handleRequestReset
            : formType === "confirmReset"
            ? handleConfirmReset
            : handleAuthSubmit
        }
      >
        {formType === "signup" && (
          <>
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
            <div>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}
        {(formType === "signup" || formType === "login" || formType === "requestReset") && (
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
        {(formType === "signup" || formType === "login") && (
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        )}
        {formType === "confirmReset" && (
          <div>
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
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
            : formType === "requestReset"
            ? "Request Reset"
            : "Reset Password"}
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
          <>
            <p>
              Don't have an account?{" "}
              <span onClick={() => setFormType("signup")} style={{ cursor: "pointer", color: "blue" }}>
                Sign Up
              </span>
            </p>
            <p>
              Forgot your password?{" "}
              <span onClick={() => setFormType("requestReset")} style={{ cursor: "pointer", color: "blue" }}>
                Reset Password
              </span>
            </p>
          </>
        )}
        {formType === "requestReset" && (
          <p>
            Remembered your password?{" "}
            <span onClick={() => setFormType("login")} style={{ cursor: "pointer", color: "blue" }}>
              Log In
            </span>
          </p>
        )}
        {formType === "confirmReset" && (
          <p>
            Reset successful?{" "}
            <span onClick={() => setFormType("login")} style={{ cursor: "pointer", color: "blue" }}>
              Log In
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default AuthPage;