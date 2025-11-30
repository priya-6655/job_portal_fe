// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Helper function to construct API URLs
export const apiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;

