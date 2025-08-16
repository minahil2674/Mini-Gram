// src/services/postService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/posts";

// Helper: Get headers with token
const getAuthConfig = (extraHeaders = {}) => {
  const token = localStorage.getItem("token");
  const headers = {
    ...extraHeaders,
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  return { headers };
};

// Create a new post (supports multipart/form-data if image present)
export const createPost = async (postData) => {
  try {
    const isFormData = postData instanceof FormData;
    const res = await axios.post(
      API_URL,
      postData,
      getAuthConfig(isFormData ? { "Content-Type": "multipart/form-data" } : {})
    );
    // return the created post object
    return res.data.post || res.data;
  } catch (err) {
    console.error("Error creating post:", err.response?.data || err.message);
    throw err;
  }
};

// Fetch all posts
export const fetchPosts = async () => {
  try {
    const res = await axios.get(API_URL, getAuthConfig());
    // backend might return { posts: [...] } or posts array directly
    return res.data.posts || res.data;
  } catch (err) {
    console.error("Error fetching posts:", err.response?.data || err.message);
    throw err;
  }
};

// Fetch posts for a specific user (profile page)
export const fetchUserPosts = async (userId) => {
  try {
    const res = await axios.get(`${API_URL}/user/${userId}`, getAuthConfig());
    return res.data.posts || res.data;
  } catch (err) {
    console.error("Error fetching user posts:", err.response?.data || err.message);
    throw err;
  }
};

// Get a single post by ID
export const getPostById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`, getAuthConfig());
    return res.data.post || res.data;
  } catch (err) {
    console.error(`Error fetching post ${id}:`, err.response?.data || err.message);
    throw err;
  }
};

// Delete a post
export const deletePost = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`, getAuthConfig());
    return res.data;
  } catch (err) {
    console.error(`Error deleting post ${id}:`, err.response?.data || err.message);
    throw err;
  }
};

// Like a post (returns the updated post object)
export const likePost = async (id) => {
  try {
    const res = await axios.post(`${API_URL}/${id}/like`, {}, getAuthConfig());
    return res.data.post || res.data;
  } catch (err) {
    console.error(`Error liking post ${id}:`, err.response?.data || err.message);
    throw err;
  }
};

// Unlike a post (if your backend supports separate unlike route)
export const unlikePost = async (id) => {
  try {
    const res = await axios.post(`${API_URL}/${id}/unlike`, {}, getAuthConfig());
    return res.data.post || res.data;
  } catch (err) {
    console.error(`Error unliking post ${id}:`, err.response?.data || err.message);
    throw err;
  }
};

// Add a comment to a post — returns the updated post object
export const addComment = async (postId, commentText) => {
  try {
    const res = await axios.post(
      `${API_URL}/${postId}/comment`,
      { text: commentText },
      getAuthConfig()
    );
    return res.data.post || res.data; // normalize to updated post
  } catch (err) {
    console.error(
      `Error adding comment to post ${postId}:`,
      err.response?.data || err.message
    );
    throw err;
  }
};

// Delete a comment (optional)
export const deleteComment = async (postId, commentId) => {
  try {
    const res = await axios.delete(
      `${API_URL}/${postId}/comment/${commentId}`,
      getAuthConfig()
    );
    return res.data;
  } catch (err) {
    console.error(
      `Error deleting comment ${commentId} on post ${postId}:`,
      err.response?.data || err.message
    );
    throw err;
  }
};
