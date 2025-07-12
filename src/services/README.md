# API Service Documentation

## 🚧 Current Status: DEVELOPMENT MODE

Dự án hiện đang sử dụng **MOCK DATA** để phát triển frontend. Tất cả API calls sẽ được thay thế bằng real API từ Java backend khi sẵn sàng.

## 📁 Files Structure

```
src/services/
├── api.ts           # Main API functions với mock data
├── config.ts        # Configuration và environment variables
└── README.md        # Documentation này
```

## 🔧 Configuration

### Environment Variables (.env)
```bash
# API Configuration for Java Backend
VITE_API_URL=http://localhost:8080
VITE_WS_URL=ws://localhost:8080/ws/dashboard
VITE_APP_TITLE=Home Assistant Dashboard

# Development Settings
VITE_DEV_MODE=true
VITE_ENABLE_MOCK_DATA=true
```

### Switching to Real API

Để chuyển sang real API từ Java backend:

1. **Cập nhật .env file:**
```bash
VITE_DEV_MODE=false
VITE_ENABLE_MOCK_DATA=false
```

2. **Hoặc programmatically trong config.ts:**
```typescript
export const config = {
  ENABLE_MOCK_DATA: false, // Set to false
  // ... other configs
};
```

## 🔍 API Functions

### 1. getDashboardData()
- **Mock**: Trả về fake data sau 500ms
- **Real**: `GET /api/dashboard`
- **Console Log**: `🚧 Using MOCK DATA` hoặc `📡 Calling Java backend API`

### 2. toggleLight(lightId)
- **Mock**: Toggle trạng thái light trong mock data
- **Real**: `PUT /api/lights/{lightId}/toggle`

### 3. setLightBrightness(lightId, brightness)
- **Mock**: Cập nhật brightness trong mock data
- **Real**: `PUT /api/lights/{lightId}/brightness`

### 4. activateScene(sceneId)
- **Mock**: Activate scene trong mock data (tự động inactive sau 3s)
- **Real**: `POST /api/scenes/{sceneId}/activate`

### 5. getSensorData()
- **Mock**: Trả về fake sensor data
- **Real**: `GET /api/sensors`

### 6. getCameraStream(cameraId)
- **Mock**: Trả về placeholder image URL
- **Real**: `GET /api/cameras/{cameraId}/stream`

## 🌐 WebSocket Connection

### Mock WebSocket
- Simulate random sensor updates mỗi 5 giây
- Console log: `🚧 Using MOCK WebSocket`

### Real WebSocket
- Kết nối đến `ws://localhost:8080/ws/dashboard`
- Auto-reconnect sau 5s nếu mất kết nối
- Console log: `📡 Connecting to Java backend WebSocket`

## 📊 Expected Java Backend API

### REST Endpoints:
```
GET    /api/dashboard                 # Get all dashboard data
GET    /api/lights                    # Get all lights
PUT    /api/lights/{id}/toggle        # Toggle light
PUT    /api/lights/{id}/brightness    # Set brightness
GET    /api/sensors                   # Get sensor data
GET    /api/cameras                   # Get cameras
GET    /api/cameras/{id}/stream       # Get camera stream
GET    /api/scenes                    # Get scenes
POST   /api/scenes/{id}/activate      # Activate scene
```

### WebSocket:
```
ws://localhost:8080/ws/dashboard
```

**Message Format:**
```json
{
  "type": "light|sensor|camera|scene",
  "data": {
    "id": "device_id",
    "status": "on|off|active|inactive",
    "value": "sensor_value",
    // ... other device properties
  }
}
```

## 🐛 Debugging

### Console Logs
- `🚧 Using MOCK DATA` = Mock mode active
- `📡 Calling Java backend API` = Real API call
- `✅ WebSocket connected` = WebSocket connected successfully  
- `❌ WebSocket error` = WebSocket connection error
- `🔄 Attempting to reconnect` = Auto-reconnect WebSocket

### Network Tab
- Mock mode: Không có network requests
- Real mode: Check network tab for HTTP requests to `localhost:8080`

## 🚀 Production Deployment

Khi deploy production:

1. Set environment variables:
```bash
VITE_API_URL=https://your-java-backend.com
VITE_WS_URL=wss://your-java-backend.com/ws/dashboard
VITE_DEV_MODE=false
VITE_ENABLE_MOCK_DATA=false
```

2. Đảm bảo Java backend running và accessible
3. Test tất cả API endpoints
4. Test WebSocket connection
