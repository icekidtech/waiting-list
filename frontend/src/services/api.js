// client/src/services/api.js
import axios from 'axios';

// Create an Axios instance for the API
const api = axios.create({
  baseURL: "http://localhost:5000", // Proxy will forward this to the backend
});

// Signup function
export const signup = async (formData) => {
  try {
    const response = await api.post('/signup', {
      username: formData.username,
      email: formData.email,
    });
    return response.data; // Return the data from the response
  } catch (error) {
    // Handle and log the error
    console.error('Error during signup:', error.response?.data || error.message);
    throw error.response?.data || { message: 'An unexpected error occurred' };
  }
};

// Example usage for other routes:
// You can create similar functions for login, verify-otp, etc., like this:

// Login function
export const login = async (email) => {
  try {
    const response = await api.post('/login', { email });
    return response.data;
  } catch (error) {
    console.error('Error during login:', error.response?.data || error.message);
    throw error.response?.data || { message: 'An unexpected error occurred' };
  }
};

// Verify OTP function
export const verifyOtp = async (email, otp) => {
  try {
    const response = await api.post('/verify-otp', { email, otp });
    return response.data;
  } catch (error) {
    console.error('Error verifying OTP:', error.response?.data || error.message);
    throw error.response?.data || { message: 'An unexpected error occurred' };
  }
};

export default api;