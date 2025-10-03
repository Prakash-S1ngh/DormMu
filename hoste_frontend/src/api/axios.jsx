import axios from "axios";

// Environment-based API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const API = axios.create({
  baseURL: `${API_BASE_URL}/auth`,
  withCredentials: true, // Enable cookies
  timeout: 10000,
});

// Request interceptor to add token from cookies or localStorage
API.interceptors.request.use((config) => {
  // Try to get token from cookies first, then localStorage as fallback
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {});
  
  const token = cookies.authToken || JSON.parse(localStorage.getItem("userData"))?.token;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

// Response interceptor for better error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, clear storage and redirect to login
      localStorage.removeItem("userData");
      document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default API;
