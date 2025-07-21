import React from 'react';
import { Room } from '../types';
import SensorCard from './SensorCard';
import DeviceGroup from './DeviceGroup';
import './RoomCard.css';

interface RoomCardProps {
  room: Room;
  onToggleDevice: (roomId: string, deviceId: string) => void;
  onUpdateBrightness: (roomId: string, lightId: string, brightness: number) => void;
  onUpdateAC: (roomId: string, acId: string, settings: any) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({
  room,
  onToggleDevice,
  onUpdateBrightness,
  onUpdateAC
}) => {
  const getRoomIcon = (roomId: string): string => {
    switch (roomId) {
      case 'bedroom':
        return '🛏️';
      case 'living-room':
        return '🛋️';
      case 'kitchen':
        return '🍽️';
      case 'bathroom':
        return '🚿';
      default:
        return '🏠';
    }
  };

  const getRoomName = (roomId: string): string => {
    switch (roomId) {
      case 'bedroom':
        return 'Phòng ngủ';
      case 'living-room':
        return 'Phòng khách';
      case 'kitchen':
        return 'Phòng bếp';
      case 'bathroom':
        return 'Phòng tắm';
      default:
        return roomId;
    }
  };

  const totalDevices = room.lights.length + room.acs.length + room.others.length;
  const activeDevices = [
    ...room.lights.filter(l => l.status === 'on'),
    ...room.acs.filter(ac => ac.status === 'on'),
    ...room.others.filter(d => d.status === 'on')
  ].length;

  return (
    <div className="room-card">
      <div className="room-header">
        <div className="room-info">
          <div className="room-icon">{getRoomIcon(room.id)}</div>
          <div className="room-details">
            <h2 className="room-name">{getRoomName(room.id)}</h2>
            <p className="room-stats">
              {activeDevices}/{totalDevices} thiết bị đang hoạt động
            </p>
          </div>
        </div>
        <div className="room-status">
          <div className="status-indicator">
            <span className={`status-dot ${activeDevices > 0 ? 'active' : 'inactive'}`}></span>
            <span className="status-text">
              {activeDevices > 0 ? 'Đang hoạt động' : 'Tắt hết'}
            </span>
          </div>
        </div>
      </div>

      {/* Sensor Information */}
      <div className="room-section">
        <h3 className="section-title">📊 Thông Số Môi Trường</h3>
        <SensorCard 
          temperature={room.temperature}
          humidity={room.humidity}
          energy={room.energy}
        />
      </div>

      {/* Device Controls */}
      <div className="room-section">
        <h3 className="section-title">🎛️ Điều Khiển Thiết Bị</h3>
        <DeviceGroup
          roomId={room.id}
          lights={room.lights}
          acs={room.acs}
          others={room.others}
          onToggleDevice={onToggleDevice}
          onUpdateBrightness={onUpdateBrightness}
          onUpdateAC={onUpdateAC}
        />
      </div>
    </div>
  );
};

export default RoomCard;
