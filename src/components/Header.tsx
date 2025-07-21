import React from 'react';

interface HeaderProps {
  totalRooms: number;
  totalDevices: number;
  totalPowerConsumption: number;
}

const Header: React.FC<HeaderProps> = ({ totalRooms, totalDevices, totalPowerConsumption }) => {
  const currentTime = new Date().toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-title">
          <h1>🏠 IoT Room Dashboard</h1>
          <p className="header-subtitle">
            Giám sát và điều khiển nhà thông minh
          </p>
        </div>
        
        <div className="header-stats">
          <div className="header-stat">
            <span className="header-stat-value">{totalRooms}</span>
            <span className="header-stat-label">Phòng</span>
          </div>
          
          <div className="header-stat">
            <span className="header-stat-value">{totalDevices}</span>
            <span className="header-stat-label">Thiết bị</span>
          </div>
          
          <div className="header-stat">
            <span className="header-stat-value">{totalPowerConsumption}W</span>
            <span className="header-stat-label">Điện</span>
          </div>
          
          <div className="header-time">
            <div>🕐 {currentTime}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
