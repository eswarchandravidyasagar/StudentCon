import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000'; // Adjust the URL based on your Flask server

// Register a new user
export const register = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Login user
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Post a new listing
export const postListing = async (title, description, price, userId) => {
  try {
    const response = await axios.post(`${API_URL}/listings`, { title, description, price, user_id: userId });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get all listings
export const getListings = async () => {
  try {
    const response = await axios.get(`${API_URL}/listings`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update a listing
export const updateListing = async (listingId, title, description, price, userId) => {
  try {
    const response = await axios.put(`${API_URL}/listings/${listingId}`, { title, description, price, user_id: userId });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Delete a listing
export const deleteListing = async (listingId, userId) => {
  try {
    const response = await axios.delete(`${API_URL}/listings/${listingId}`, { data: { user_id: userId } });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get user profile
export const getProfile = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/profile/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update user profile
export const updateProfile = async (userId, username, password) => {
  try {
    const response = await axios.put(`${API_URL}/profile/${userId}`, { username, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Delete user profile
export const deleteProfile = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/profile/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get all user profiles
export const getProfiles = async () => {
  try {
    const response = await axios.get(`${API_URL}/profiles`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
