import axios from "axios";

const API_BASE = "http://localhost:5000/api/client"; // change to your backend URL

export const loginClient = async (email, password) => {
  const response = await axios.post(`${API_BASE}/login`, { email, password });
  return response.data; // should return user info + token
};

export const signupClient = async (data) => {
  const response = await axios.post(`${API_BASE}/signup`, data);
  return response.data;
};

export const sendOtp = async (email) => {
  const response = await axios.post(`${API_BASE}/forgot-password`, { email });
  return response.data;
};

export const verifyOtp = async (email, otp) => {
  const response = await axios.post(`${API_BASE}/verify-otp`, { email, otp });
  return response.data;
};

export const resetPassword = async (email, password) => {
  const response = await axios.post(`${API_BASE}/reset-password`, { email, password });
  return response.data;
};
