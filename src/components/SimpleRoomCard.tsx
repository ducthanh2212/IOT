import React from 'react';

interface SimpleRoomCardProps {
  roomName: string;
  icon: string;
  temperature: number;
  humidity: number;
  power: number;
}

const SimpleRoomCard: React.FC<SimpleRoomCardProps> = ({ 
  roomName, 
  icon, 
  temperature, 
  humidity, 
  power 
}) => {
  return (
    <div className="room-card">
      <div className="room-header">
        <div className="room-title">
          <span className="room-icon">{icon}</span>
          <h2 className="room-name">{roomName}</h2>
        </div>
        <div className="room-status">
          <div className="device-count">
            <span className="active-devices">2</span>
            <span className="total-devices">/3 thiết bị</span>
          </div>
        </div>
      </div>

      <div className="room-content">
        <div className="sensor-card">
          <div className="sensor-item">
            <span className="sensor-icon">🌡️</span>
            <span className="sensor-value">{temperature}°C</span>
            <span className="sensor-label">Nhiệt độ</span>
          </div>
          <div className="sensor-item">
            <span className="sensor-icon">💧</span>
            <span className="sensor-value">{humidity}%</span>
            <span className="sensor-label">Độ ẩm</span>
          </div>
          <div className="sensor-item">
            <span className="sensor-icon">⚡</span>
            <span className="sensor-value">{power}W</span>
            <span className="sensor-label">Công suất</span>
          </div>
          <div className="sensor-item">
            <span className="sensor-icon">🔌</span>
            <span className="sensor-value">220V</span>
            <span className="sensor-label">Điện áp</span>
          </div>
          <div className="sensor-item">
            <span className="sensor-icon">🍃</span>
            <span className="sensor-value">450ppm</span>
            <span className="sensor-label">CO2</span>
          </div>
        </div>
      </div>

      <div className="room-summary">
        <div className="summary-item">
          <span className="summary-label">Tiêu thụ điện:</span>
          <span className="summary-value">{power}W</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Môi trường:</span>
          <span className="summary-value">{temperature}°C • {humidity}%</span>
        </div>
      </div>
    </div>
  );
};

export default SimpleRoomCard;
