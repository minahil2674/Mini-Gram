import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // Your backend URL

// Register new user
export const register = async (userData) => {
  try {
    const res = await axios.post(`${API_URL}/register`, userData);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Registration failed" };
  }
};


// Verify OTP
export const verifyOtp = async ({ email, otp }) => {
  try {
    const res = await axios.post(`${API_URL}/verify-otp`, { email, otp });
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "OTP verification failed" };
  }
};

// Login user
export const login = async (credentials) => {
  try {
    const res = await axios.post(`${API_URL}/login`, credentials);
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

// Get current logged-in user's profile
export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const res = await axios.get(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.user || res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch profile" };
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem("token");
};

export default {
  register,
  verifyOtp, 
  login, // add this export
  getCurrentUser,
  logout,
};
