import React from 'react';
import { useDashboard } from '../hooks/useDashboard';
import LightCard from '../cards/LightCard';
import SensorCard from '../cards/SensorCard';
import CameraCard from '../cards/CameraCard';
import SceneCard from '../cards/SceneCard';
import LoadingOverlay from '../components/LoadingOverlay';

const Home = () => {
  const { data, loading, actionLoading, actionMessage, error, toggleLight, setBrightness, activateScene } = useDashboard();

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="no-data">
        <p>No data available</p>
      </div>
    );
  }

  // Calculate stats for top bar
  const lightsOn = data.lights.filter(light => light.status === 'on').length;
  const totalLights = data.lights.length;
  const activeSensors = data.sensors.filter(sensor => sensor.status === 'active').length;
  const totalSensors = data.sensors.length;
  const activeCameras = data.cameras.filter(camera => camera.status === 'active').length;
  const totalCameras = data.cameras.length;

  // Get current temperature for top display
  const tempSensor = data.sensors.find(s => s.name === 'Temperature');
  const humiditySensor = data.sensors.find(s => s.name === 'Humidity');

  return (
    <div className="dashboard">
      {/* Top Stats Bar */}
      <div className="top-stats">
        <div className="stat-item">
          <span className="stat-icon">🌡️</span>
          <span className="stat-value">10.5°C</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">💧</span>
          <span className="stat-value">70.4%</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">🌞</span>
          <span className="stat-value">Đi vắng</span>
        </div>
      </div>

      {/* Room Sections */}
      <div className="room-section">
        <div className="room-header">
          <h2 className="room-title">🏠 Phòng khách</h2>
          <div className="room-stats">
            <div className="room-stat">
              <span>🌡️</span>
              <span>{tempSensor?.value || '22.8'}°C</span>
            </div>
            <div className="room-stat">
              <span>💧</span>
              <span>{humiditySensor?.value || '57'}%</span>
            </div>
          </div>
        </div>
        <div className="room-devices">
          {data.lights.slice(0, 3).map(light => (
            <LightCard 
              key={light.id} 
              light={light} 
              onToggle={toggleLight}
              onBrightnessChange={setBrightness}
            />
          ))}
          {data.sensors.slice(0, 2).map(sensor => (
            <SensorCard 
              key={sensor.id} 
              sensor={sensor}
            />
          ))}
        </div>
      </div>

      <div className="room-section">
        <div className="room-header">
          <h2 className="room-title">🍽️ Điều hòa</h2>
          <div className="room-stats">
            <div className="room-stat">
              <span>🌡️</span>
              <span>Trên đường chăn trời</span>
            </div>
          </div>
        </div>
        <div className="room-devices">
          {data.sensors.map(sensor => (
            <SensorCard 
              key={sensor.id} 
              sensor={sensor}
            />
          ))}
        </div>
      </div>

      <div className="room-section">
        <div className="room-header">
          <h2 className="room-title">⚡ Năng lượng</h2>
        </div>
        <div className="room-devices">
          <div className="card sensor-card">
            <div className="card-header">
              <h4>EV</h4>
              <span className="icon">🚗</span>
            </div>
            <div className="card-content">
              <p className="status">Đã rút phích cắm</p>
            </div>
          </div>
          <div className="card sensor-card">
            <div className="card-header">
              <h4>Last charge</h4>
              <span className="icon">⚡</span>
            </div>
            <div className="card-content">
              <p className="value">16.3 kWh</p>
            </div>
          </div>
          <div className="card sensor-card">
            <div className="card-header">
              <h4>Home power</h4>
              <span className="icon">🏠</span>
            </div>
            <div className="card-content">
              <p className="value">797.86 W</p>
            </div>
          </div>
          <div className="card sensor-card">
            <div className="card-header">
              <h4>Voltage</h4>
              <span className="icon">⚡</span>
            </div>
            <div className="card-content">
              <p className="value">232.19 V</p>
            </div>
          </div>
          <div className="card sensor-card">
            <div className="card-header">
              <h4>Fossil fuel</h4>
              <span className="icon">⛽</span>
            </div>
            <div className="card-content">
              <p className="value">9.84%</p>
            </div>
          </div>
          <div className="card sensor-card">
            <div className="card-header">
              <h4>CO2 Intensity</h4>
              <span className="icon">🌍</span>
            </div>
            <div className="card-content">
              <p className="value">62.0 gCO2eq/kWh</p>
            </div>
          </div>
        </div>
      </div>

      <div className="room-section">
        <div className="room-header">
          <h2 className="room-title">🏠 Phòng học</h2>
        </div>
        <div className="room-devices">
          {data.scenes.map(scene => (
            <SceneCard 
              key={scene.id} 
              scene={scene}
              onActivate={activateScene}
            />
          ))}
          <div className="card sensor-card">
            <div className="card-header">
              <h4>Nest Hub</h4>
              <span className="icon">🔊</span>
            </div>
            <div className="card-content">
              <p className="status">Tắt</p>
            </div>
          </div>
          <div className="card sensor-card">
            <div className="card-header">
              <h4>Desk</h4>
              <span className="icon">🪑</span>
            </div>
            <div className="card-content">
              <p className="value">72 cm</p>
            </div>
          </div>
          <div className="card sensor-card">
            <div className="card-header">
              <h4>Meeting mode</h4>
              <span className="icon">📹</span>
            </div>
            <div className="card-content">
              <p className="status">Bật</p>
            </div>
          </div>
        </div>
      </div>

      <div className="room-section">
        <div className="room-header">
          <h2 className="room-title">🌐 Ngoài trời</h2>
        </div>
        <div className="room-devices">
          <div className="card sensor-card">
            <div className="card-header">
              <h4>Sun</h4>
              <span className="icon">☀️</span>
            </div>
            <div className="card-content">
              <p className="status">Trên đường chăn trời</p>
            </div>
          </div>
          <div className="card sensor-card">
            <div className="card-header">
              <h4>Rain</h4>
              <span className="icon">🌧️</span>
            </div>
            <div className="card-content">
              <p className="value">7.2 mm</p>
            </div>
          </div>
          <div className="card sensor-card">
            <div className="card-header">
              <h4>Downstairs</h4>
              <span className="icon">🏠</span>
            </div>
            <div className="card-content">
              <p className="status">Thoải mái</p>
              <p className="value">20.8 °C</p>
            </div>
          </div>
          <div className="card sensor-card">
            <div className="card-header">
              <h4>Upstairs</h4>
              <span className="icon">🏠</span>
            </div>
            <div className="card-content">
              <p className="status">Thoải mái</p>
              <p className="value">21.7 °C</p>
            </div>
          </div>
        </div>
      </div>

      <div className="room-section">
        <div className="room-header">
          <h2 className="room-title">🔄 Cập nhật</h2>
        </div>
        <div className="room-devices">
          <div className="card sensor-card">
            <div className="card-header">
              <h4>System Updates</h4>
              <span className="icon">🔄</span>
            </div>
            <div className="card-content">
              <p className="status">Up to date</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Loading Overlay */}
      <LoadingOverlay 
        isVisible={actionLoading} 
        message={actionMessage || 'Processing...'} 
      />
    </div>
  );
};

export default Home;