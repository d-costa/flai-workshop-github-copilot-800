// API Configuration
const getApiUrl = () => {
  // Check if running in development with environment variable
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // Fallback to constructing from CODESPACE_NAME
  if (process.env.REACT_APP_CODESPACE_NAME) {
    return `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`;
  }
  
  // Fallback to localhost for local development
  return 'http://localhost:8000';
};

export const API_BASE_URL = getApiUrl();

export const API_ENDPOINTS = {
  activities: `${API_BASE_URL}/api/activities/`,
  leaderboard: `${API_BASE_URL}/api/leaderboard/`,
  teams: `${API_BASE_URL}/api/teams/`,
  users: `${API_BASE_URL}/api/users/`,
  workouts: `${API_BASE_URL}/api/workouts/`,
};

console.log('API Configuration:', {
  baseUrl: API_BASE_URL,
  endpoints: API_ENDPOINTS
});
