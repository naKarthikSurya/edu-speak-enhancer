/**
 * Configuration file for backend API settings
 */

// Base URL for API requests - change this for different environments
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-api-domain.com' 
  : 'http://localhost:5000';

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  // Remove leading slash if it exists
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
  return `${API_BASE_URL}/${cleanEndpoint}`;
};
