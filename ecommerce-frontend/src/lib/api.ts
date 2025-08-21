import axios from 'axios';

// Create a reusable axios instance with baseURL
export const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend URL
});

// Automatically attach JWT token from localStorage to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// =========================
// AUTH ENDPOINTS
// =========================

// Register a new user
export const registerUser = (payload: {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}) => api.post("/auth/register", payload);

// Login user
export const loginUser = (email: string, password: string) =>
  api.post("/auth/login", { email, password });

// Get logged-in user's profile
export const getMe = () => api.get("/auth/me");

// =========================
// USER UTILITIES
// =========================

// Check if username already exists
export const checkUsernameAvailability = async (username: string) => {
  // Calls backend endpoint: GET /users/check-username?username=theName
  const res = await api.get("/users/check-username", {
    params: { username }
  });
  // Assuming backend returns: { exists: true/false }
  return res.data.exists as boolean;
};

// Check if email already exists (optional extra)
export const checkEmailAvailability = async (email: string) => {
  // Calls backend endpoint: GET /users/check-email?email=theEmail
  const res = await api.get("/users/check-email", {
    params: { email }
  });
  return res.data.exists as boolean;
};
