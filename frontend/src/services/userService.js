// src/services/userService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

// Helper to get auth headers
const getAuthConfig = (extraHeaders = {}) => {
  const token = localStorage.getItem("token");
  const headers = { ...extraHeaders };
  if (token) headers.Authorization = `Bearer ${token}`;
  return { headers, withCredentials: true };
};


// Fetch current user profile (or by ID)
export const fetchUserProfileAPI = async (userId) => {
  try {
    const url = userId ? `${API_URL}/profile/${userId}` : `${API_URL}/profile`;
    const res = await axios.get(url, getAuthConfig());
    return res.data.user || res.data;
  } catch (err) {
    console.error("fetchUserProfileAPI error:", err.response?.data || err.message);
    throw err;
  }
};

// Update profile text info (name, bio)
export const updateProfileAPI = async (profileData) => {
  const res = await axios.put(`${API_URL}/profile`, profileData, getAuthConfig({ "Content-Type": "application/json" }));
  return res.data.user || res.data;
};

// Upload profile image
export const uploadProfileImageAPI = async (file) => {
  if (!file) throw new Error("No file provided");
  const formData = new FormData();
  formData.append("profileImage", file);

  const res = await axios.put(`${API_URL}/profile/image`, formData, getAuthConfig());

  return res.data.user || res.data;
};

// Fetch posts by user
export const fetchUserPostsAPI = async (userId) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/posts/user/${userId}`, getAuthConfig());
    return res.data.posts || res.data;
  } catch (error) {
    console.error("fetchUserPostsAPI error:", error.response?.data || error.message);
    throw error;
  }
};
