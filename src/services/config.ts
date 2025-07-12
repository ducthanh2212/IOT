// Environment configuration utility
export const config = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  WS_URL: import.meta.env.VITE_WS_URL || 'ws://localhost:8080/ws/dashboard',
  APP_TITLE: import.meta.env.VITE_APP_TITLE || 'Home Assistant Dashboard',
  
  // Development flags
  DEV_MODE: import.meta.env.VITE_DEV_MODE === 'true',
  ENABLE_MOCK_DATA: import.meta.env.VITE_ENABLE_MOCK_DATA === 'true',
  
  // API endpoints
  ENDPOINTS: {
    DASHBOARD: '/api/dashboard',
    LIGHTS: '/api/lights',
    SENSORS: '/api/sensors',
    CAMERAS: '/api/cameras',
    SCENES: '/api/scenes',
    WEBSOCKET: '/ws/dashboard'
  }
};

// Helper function to determine if we should use mock data
export const shouldUseMockData = (): boolean => {
  return config.DEV_MODE && config.ENABLE_MOCK_DATA;
};

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${config.API_BASE_URL}${endpoint}`;
};

// Helper function to get WebSocket URL
export const getWsUrl = (): string => {
  return config.WS_URL;
};
