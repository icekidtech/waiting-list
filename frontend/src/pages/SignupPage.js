import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignupPage() {
  const navigate = useNavigate();
  const [formType, setFormType] = useState('signup'); // 'signup', 'login', or 'reset'
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = formType === 'signup' ? '/api/signup' : '/api/login';
      const response = await axios.post(endpoint, formData);

      if (response.data.success) {
        localStorage.setItem('token', response.data.token); // Save token for authentication
        navigate('/dashboard'); // Redirect to dashboard
      }
    } catch (err) {
      setError(err.response.data.message || 'An error occurred.');
    }
  };

  // Handle password reset
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/password-reset', {
        email: formData.email,
      });

      if (response.data.success) {
        alert('Password reset link sent to your email.');
        setFormType('login'); // Switch to login form
      }
    } catch (err) {
      setError(err.response.data.message || 'An error occurred.');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', textAlign: 'center' }}>
      <h1>{formType === 'signup' ? 'Sign Up' : formType === 'login' ? 'Login' : 'Reset Password'}</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={formType === 'reset' ? handlePasswordReset : handleSubmit}>
        {formType === 'signup' && (
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
        {(formType === 'signup' || formType === 'login') && (
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
        {(formType === 'signup' || formType === 'login') && (
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
        {formType === 'reset' && (
          <div>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <button type="submit" style={{ marginTop: '20px' }}>
          {formType === 'signup'
            ? 'Sign Up'
            : formType === 'login'
            ? 'Log In'
            : 'Reset Password'}
        </button>
      </form>

      <div style={{ marginTop: '20px' }}>
        {formType === 'signup' && (
          <p>
            Already have an account?{' '}
            <span onClick={() => setFormType('login')} style={{ cursor: 'pointer', color: 'blue' }}>
              Log In
            </span>
          </p>
        )}
        {formType === 'login' && (
          <>
            <p>
              Don't have an account?{' '}
              <span onClick={() => setFormType('signup')} style={{ cursor: 'pointer', color: 'blue' }}>
                Sign Up
              </span>
            </p>
            <p>
              Forgot your password?{' '}
              <span onClick={() => setFormType('reset')} style={{ cursor: 'pointer', color: 'blue' }}>
                Reset Password
              </span>
            </p>
          </>
        )}
        {formType === 'reset' && (
          <p>
            Remembered your password?{' '}
            <span onClick={() => setFormType('login')} style={{ cursor: 'pointer', color: 'blue' }}>
              Log In
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default SignupPage;