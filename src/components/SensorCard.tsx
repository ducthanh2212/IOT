import React from 'react';

interface SensorCardProps {
  temperature: number;
  humidity: number;
  energy: {
    power: number;
    voltage: number;
    co2: number;
  };
}

const SensorCard: React.FC<SensorCardProps> = ({ temperature, humidity, energy }) => {
  return (
    <div className="sensor-card">
      <div className="sensor-grid">
        <div className="sensor-item">
          <div className="sensor-icon">🌡️</div>
          <div className="sensor-info">
            <span className="sensor-label">Nhiệt độ</span>
            <span className="sensor-value">{temperature}°C</span>
          </div>
        </div>
        
        <div className="sensor-item">
          <div className="sensor-icon">💧</div>
          <div className="sensor-info">
            <span className="sensor-label">Độ ẩm</span>
            <span className="sensor-value">{humidity}%</span>
          </div>
        </div>
        
        <div className="sensor-item">
          <div className="sensor-icon">⚡</div>
          <div className="sensor-info">
            <span className="sensor-label">Công suất</span>
            <span className="sensor-value">{energy.power}W</span>
          </div>
        </div>
        
        <div className="sensor-item">
          <div className="sensor-icon">🔌</div>
          <div className="sensor-info">
            <span className="sensor-label">Điện áp</span>
            <span className="sensor-value">{energy.voltage}V</span>
          </div>
        </div>
        
        <div className="sensor-item">
          <div className="sensor-icon">🌿</div>
          <div className="sensor-info">
            <span className="sensor-label">CO₂</span>
            <span className="sensor-value">{energy.co2}ppm</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorCard;
