import { DashboardData } from '../types';
import { config, shouldUseMockData, getApiUrl } from './config';

// =====================================
// FAKE DATA - TEMPORARY FOR DEVELOPMENT
// TODO: Remove this section when Java backend is ready
// =====================================
export const mockDashboardData: DashboardData = {
  lights: [
    {
      id: '1',
      name: 'Floor lamp',
      type: 'light',
      status: 'on',
      brightness: 70,
    },
    {
      id: '2',
      name: 'Bar lamp',
      type: 'light',
      status: 'on',
      brightness: 75,
    },
    {
      id: '3',
      name: 'Spotlights',
      type: 'light',
      status: 'off',
      brightness: 49,
    },
  ],
  sensors: [
    {
      id: '4',
      name: 'Temperature',
      type: 'sensor',
      status: 'active',
      value: '10.5',
      unit: '°C',
      icon: '🌡️',
    },
    {
      id: '5',
      name: 'Humidity',
      type: 'sensor',
      status: 'active',
      value: '70.4',
      unit: '%',
      icon: '💧',
    },
    {
      id: '6',
      name: 'Air Quality',
      type: 'sensor',
      status: 'active',
      value: 'Good',
      unit: '',
      icon: '🌿',
    },
  ],
  cameras: [
    {
      id: '7',
      name: 'Front Door Camera',
      type: 'camera',
      status: 'active',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=Front+Door+Camera',
    },
    {
      id: '8',
      name: 'Garden Camera',
      type: 'camera',
      status: 'active',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=Garden+Camera',
    },
  ],
  scenes: [
    {
      id: '9',
      name: 'Shutter',
      type: 'scene',
      status: 'inactive',
      description: 'Mở - 17%',
    },
    {
      id: '10',
      name: 'Worktop',
      type: 'scene',
      status: 'inactive',
      description: 'Tắt',
    },
    {
      id: '11',
      name: 'Fridge',
      type: 'scene',
      status: 'inactive',
      description: 'Đóng',
    },
    {
      id: '12',
      name: 'Nest mini',
      type: 'scene',
      status: 'active',
      description: 'Đang chơi',
    },
  ],
};

// =====================================
// HTTP CLIENT UTILITIES
// =====================================
const httpClient = {
  get: async (url: string) => {
    const response = await fetch(getApiUrl(url), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  post: async (url: string, data: any) => {
    const response = await fetch(getApiUrl(url), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  put: async (url: string, data: any) => {
    const response = await fetch(getApiUrl(url), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  delete: async (url: string) => {
    const response = await fetch(getApiUrl(url), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },
};

// =====================================
// MAIN API FUNCTIONS
// =====================================

/**
 * Get all dashboard data (lights, sensors, cameras, scenes)
 * TODO: Replace with real API call to Java backend
 * Expected Java endpoint: GET /api/dashboard
 */
export const getDashboardData = (): Promise<DashboardData> => {
  // Check if we should use mock data
  if (shouldUseMockData()) {
    // MOCK DATA - Remove this when Java backend is ready
    console.log('🚧 Using MOCK DATA - Java backend not connected');
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockDashboardData), 500);
    });
  }
  
  // TODO: Uncomment this when Java backend is ready
  // Real API call to Java backend
  console.log('📡 Calling Java backend API: GET /api/dashboard');
  return httpClient.get(config.ENDPOINTS.DASHBOARD);
};

/**
 * Toggle light on/off
 * TODO: Replace with real API call to Java backend  
 * Expected Java endpoint: PUT /api/lights/{lightId}/toggle
 */
export const toggleLight = (lightId: string): Promise<void> => {
  // Check if we should use mock data
  if (shouldUseMockData()) {
    // MOCK DATA - Remove this when Java backend is ready
    console.log(`🚧 Using MOCK DATA - Toggle light ${lightId}`);
    return new Promise((resolve) => {
      const light = mockDashboardData.lights.find(l => l.id === lightId);
      if (light) {
        light.status = light.status === 'on' ? 'off' : 'on';
        light.brightness = light.status === 'on' ? 75 : 0;
      }
      // Simulate more realistic API delay
      setTimeout(() => resolve(), 800);
    });
  }
  
  // TODO: Uncomment this when Java backend is ready
  // Real API call to Java backend
  console.log(`📡 Calling Java backend API: PUT /api/lights/${lightId}/toggle`);
  return httpClient.put(`${config.ENDPOINTS.LIGHTS}/${lightId}/toggle`, {});
};

/**
 * Set light brightness
 * TODO: Replace with real API call to Java backend
 * Expected Java endpoint: PUT /api/lights/{lightId}/brightness
 */
export const setLightBrightness = (lightId: string, brightness: number): Promise<void> => {
  // Check if we should use mock data
  if (shouldUseMockData()) {
    // MOCK DATA - Remove this when Java backend is ready
    console.log(`🚧 Using MOCK DATA - Set light ${lightId} brightness to ${brightness}%`);
    return new Promise((resolve) => {
      const light = mockDashboardData.lights.find(l => l.id === lightId);
      if (light) {
        light.brightness = brightness;
        light.status = brightness > 0 ? 'on' : 'off';
      }
      // Simulate more realistic API delay
      setTimeout(() => resolve(), 400);
    });
  }
  
  // TODO: Uncomment this when Java backend is ready
  // Real API call to Java backend
  console.log(`📡 Calling Java backend API: PUT /api/lights/${lightId}/brightness`);
  return httpClient.put(`${config.ENDPOINTS.LIGHTS}/${lightId}/brightness`, { brightness });
};

/**
 * Toggle a scene (activate/deactivate)
 * TODO: Replace with real API call to Java backend
 * Expected Java endpoint: POST /api/scenes/{sceneId}/toggle
 */
export const activateScene = (sceneId: string): Promise<void> => {
  // Check if we should use mock data
  if (shouldUseMockData()) {
    // MOCK DATA - Remove this when Java backend is ready
    console.log(`🚧 Using MOCK DATA - Toggle scene ${sceneId}`);
    return new Promise((resolve) => {
      const scene = mockDashboardData.scenes.find(s => s.id === sceneId);
      if (scene) {
        // Toggle between active and inactive
        scene.status = scene.status === 'active' ? 'inactive' : 'active';
        console.log(`Scene ${scene.name} is now ${scene.status}`);
      }
      // Simulate more realistic API delay
      setTimeout(() => resolve(), 600);
    });
  }
  
  // TODO: Uncomment this when Java backend is ready
  // Real API call to Java backend
  console.log(`📡 Calling Java backend API: POST /api/scenes/${sceneId}/toggle`);
  return httpClient.post(`${config.ENDPOINTS.SCENES}/${sceneId}/toggle`, {});
};

/**
 * Get real-time sensor data
 * TODO: Replace with real API call to Java backend
 * Expected Java endpoint: GET /api/sensors
 */
export const getSensorData = () => {
  // Check if we should use mock data
  if (shouldUseMockData()) {
    // MOCK DATA - Remove this when Java backend is ready
    console.log('🚧 Using MOCK DATA - Get sensor data');
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockDashboardData.sensors), 300);
    });
  }
  
  // TODO: Uncomment this when Java backend is ready
  // Real API call to Java backend
  console.log('📡 Calling Java backend API: GET /api/sensors');
  return httpClient.get(config.ENDPOINTS.SENSORS);
};

/**
 * Get camera stream URL
 * TODO: Replace with real API call to Java backend
 * Expected Java endpoint: GET /api/cameras/{cameraId}/stream
 */
export const getCameraStream = (cameraId: string): Promise<string> => {
  // Check if we should use mock data
  if (shouldUseMockData()) {
    // MOCK DATA - Remove this when Java backend is ready
    console.log(`🚧 Using MOCK DATA - Get camera ${cameraId} stream`);
    return new Promise((resolve) => {
      const camera = mockDashboardData.cameras.find(c => c.id === cameraId);
      resolve(camera?.thumbnailUrl || '');
    });
  }
  
  // TODO: Uncomment this when Java backend is ready
  // Real API call to Java backend
  console.log(`📡 Calling Java backend API: GET /api/cameras/${cameraId}/stream`);
  return httpClient.get(`${config.ENDPOINTS.CAMERAS}/${cameraId}/stream`);
};

// =====================================
// WEBSOCKET CONNECTION FOR REAL-TIME UPDATES
// TODO: Implement WebSocket connection to Java backend
// Expected Java WebSocket endpoint: ws://localhost:8080/ws/dashboard
// =====================================
let websocket: WebSocket | null = null;

export const connectWebSocket = (onMessage: (data: any) => void) => {
  if (shouldUseMockData()) {
    // MOCK WebSocket - Remove this when Java backend is ready
    console.log('🚧 Using MOCK WebSocket - Java backend not connected');
    
    // Simulate periodic updates for demo
    const mockInterval = setInterval(() => {
      // Simulate random sensor updates
      const randomSensor = mockDashboardData.sensors[Math.floor(Math.random() * mockDashboardData.sensors.length)];
      if (randomSensor.name === 'Temperature') {
        randomSensor.value = (20 + Math.random() * 10).toFixed(1);
      } else if (randomSensor.name === 'Humidity') {
        randomSensor.value = (50 + Math.random() * 30).toFixed(0);
      }
      
      onMessage({
        type: 'sensor',
        data: randomSensor
      });
    }, 5000);
    
    return () => clearInterval(mockInterval);
  }
  
  // TODO: Implement real WebSocket connection when Java backend is ready
  console.log('📡 Connecting to Java backend WebSocket: ws://localhost:8080/ws/dashboard');
  
  try {
    websocket = new WebSocket(config.WS_URL);
    
    websocket.onopen = () => {
      console.log('✅ WebSocket connected to Java backend');
    };
    
    websocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('📨 Received WebSocket message:', data);
        onMessage(data);
      } catch (error) {
        console.error('❌ Error parsing WebSocket message:', error);
      }
    };
    
    websocket.onerror = (error) => {
      console.error('❌ WebSocket error:', error);
    };
    
    websocket.onclose = (event) => {
      console.log('🔌 WebSocket connection closed:', event.code, event.reason);
      // Auto-reconnect after 5 seconds
      setTimeout(() => {
        if (!websocket || websocket.readyState === WebSocket.CLOSED) {
          console.log('🔄 Attempting to reconnect WebSocket...');
          connectWebSocket(onMessage);
        }
      }, 5000);
    };
    
    return () => {
      if (websocket) {
        websocket.close();
      }
    };
  } catch (error) {
    console.error('❌ Failed to connect WebSocket:', error);
    return () => {};
  }
};

export const disconnectWebSocket = () => {
  if (websocket) {
    websocket.close();
    websocket = null;
  }
};

// =====================================
// JAVA BACKEND API SPECIFICATION
// =====================================
/*
Expected Java Spring Boot REST API endpoints:

1. GET /api/dashboard
   - Returns complete dashboard data (lights, sensors, cameras, scenes)
   - Response: DashboardData object

2. GET /api/lights
   - Returns all lights
   - Response: LightDevice[]

3. PUT /api/lights/{lightId}/toggle
   - Toggle light on/off
   - Response: success/error message

4. PUT /api/lights/{lightId}/brightness
   - Set light brightness (0-100)
   - Body: { brightness: number }
   - Response: success/error message

5. GET /api/sensors
   - Returns all sensor data
   - Response: SensorDevice[]

6. GET /api/cameras
   - Returns all cameras
   - Response: CameraDevice[]

7. GET /api/cameras/{cameraId}/stream
   - Returns camera stream URL
   - Response: { streamUrl: string }

8. GET /api/scenes
   - Returns all scenes
   - Response: SceneDevice[]

9. POST /api/scenes/{sceneId}/activate
   - Activate a scene
   - Response: success/error message

10. WebSocket /ws/dashboard
    - Real-time updates for all device states
    - Message format: { type: 'light'|'sensor'|'camera'|'scene', data: Device }
*/
