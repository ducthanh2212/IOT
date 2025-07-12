import React, { useState } from 'react';
import { useRoomManagement } from '../hooks/useRoomManagement';
import { Device } from '../types';

const ROOM_ICONS = [
  { value: '🛋', label: '🛋 Phòng khách' },
  { value: '🛏', label: '🛏 Phòng ngủ' },
  { value: '🍽', label: '🍽 Phòng ăn' },
  { value: '🛁', label: '🛁 Phòng tắm' },
  { value: '📚', label: '📚 Phòng học' },
  { value: '👨‍🍳', label: '👨‍🍳 Bếp' },
  { value: '🏠', label: '🏠 Tổng quan' },
  { value: '🌿', label: '🌿 Vườn' },
  { value: '🚗', label: '🚗 Garage' },
  { value: '🏢', label: '🏢 Văn phòng' },
];

const DEVICE_TYPES = [
  { value: 'light', label: '💡 Đèn', icon: '💡' },
  { value: 'sensor', label: '📊 Cảm biến', icon: '📊' },
  { value: 'camera', label: '📹 Camera', icon: '📹' },
  { value: 'scene', label: '🎬 Scene', icon: '🎬' },
];

const RoomManagementSection: React.FC = () => {
  const { rooms, addRoom, addDeviceToRoom, removeDeviceFromRoom, removeRoom } = useRoomManagement();
  
  console.log('RoomManagementSection rendered, rooms:', rooms);
  
  // Form states
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomIcon, setNewRoomIcon] = useState('🏠');
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [selectedDeviceType, setSelectedDeviceType] = useState<Device['type']>('light');
  const [newDeviceName, setNewDeviceName] = useState('');
  const [expandedRooms, setExpandedRooms] = useState<string[]>([]);

  // Handle add room
  const handleAddRoom = () => {
    if (newRoomName.trim()) {
      addRoom(newRoomName.trim(), newRoomIcon);
      setNewRoomName('');
      setNewRoomIcon('🏠');
    }
  };

  // Handle add device
  const handleAddDevice = () => {
    if (selectedRoomId && newDeviceName.trim()) {
      addDeviceToRoom(selectedRoomId, {
        type: selectedDeviceType,
        name: newDeviceName.trim(),
        status: selectedDeviceType === 'light' ? 'off' : 'inactive'
      });
      setNewDeviceName('');
      setSelectedRoomId('');
      setSelectedDeviceType('light');
    }
  };

  // Toggle room expansion
  const toggleRoomExpansion = (roomId: string) => {
    setExpandedRooms(prev => 
      prev.includes(roomId) 
        ? prev.filter(id => id !== roomId)
        : [...prev, roomId]
    );
  };

  // Handle delete room with confirmation
  const handleDeleteRoom = (roomId: string, roomName: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa phòng "${roomName}"? Tất cả thiết bị trong phòng cũng sẽ bị xóa.`)) {
      removeRoom(roomId);
    }
  };

  // Handle delete device with confirmation
  const handleDeleteDevice = (roomId: string, deviceId: string, deviceName: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa thiết bị "${deviceName}"?`)) {
      removeDeviceFromRoom(roomId, deviceId);
    }
  };

  const getDeviceIcon = (type: Device['type']) => {
    const deviceType = DEVICE_TYPES.find(dt => dt.value === type);
    return deviceType?.icon || '🔧';
  };

  return (
    <div className="room-management-section">
      <div className="section-header">
        <h2>🏘️ Quản lý phòng</h2>
      </div>
      
      {/* Add Room Form */}
      <div className="room-form">
        <h3>✨ Thêm phòng mới</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Tên phòng</label>
            <input
              type="text"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              placeholder="Nhập tên phòng..."
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Chọn icon</label>
            <select
              value={newRoomIcon}
              onChange={(e) => setNewRoomIcon(e.target.value)}
              className="form-select"
            >
              {ROOM_ICONS.map(icon => (
                <option key={icon.value} value={icon.value}>
                  {icon.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button 
          onClick={handleAddRoom}
          disabled={!newRoomName.trim()}
          className="btn-primary"
        >
          + Thêm phòng
        </button>
      </div>

      {/* Add Device Form */}
      <div className="device-form">
        <h3>🔌 Thêm thiết bị vào phòng</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Chọn phòng</label>
            <select
              value={selectedRoomId}
              onChange={(e) => setSelectedRoomId(e.target.value)}
              className="form-select"
            >
              <option value="">-- Chọn phòng --</option>
              {rooms.map(room => (
                <option key={room.id} value={room.id}>
                  {room.icon} {room.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Loại thiết bị</label>
            <select
              value={selectedDeviceType}
              onChange={(e) => setSelectedDeviceType(e.target.value as Device['type'])}
              className="form-select"
            >
              {DEVICE_TYPES.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label>Tên thiết bị</label>
          <input
            type="text"
            value={newDeviceName}
            onChange={(e) => setNewDeviceName(e.target.value)}
            placeholder="Nhập tên thiết bị..."
            className="form-input"
          />
        </div>
        <button 
          onClick={handleAddDevice}
          disabled={!selectedRoomId || !newDeviceName.trim()}
          className="btn-primary"
        >
          + Thêm thiết bị
        </button>
      </div>

      {/* Rooms List */}
      <div className="rooms-list">
        <h3>🏠 Danh sách phòng</h3>
        {rooms.length === 0 ? (
          <div className="empty-state">
            <p>Chưa có phòng nào. Hãy thêm phòng đầu tiên!</p>
          </div>
        ) : (
          rooms.map(room => (
            <div key={room.id} className="room-card">
              <div className="room-header">
                <div className="room-info">
                  <span className="room-icon">{room.icon}</span>
                  <div className="room-details">
                    <h4>{room.name}</h4>
                    <p>{room.devices.length} thiết bị</p>
                  </div>
                </div>
                <div className="room-actions">
                  <button 
                    onClick={() => toggleRoomExpansion(room.id)}
                    className="btn-secondary"
                  >
                    {expandedRooms.includes(room.id) ? '🔼' : '🔽'}
                  </button>
                  <button 
                    onClick={() => handleDeleteRoom(room.id, room.name)}
                    className="btn-danger"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {/* Devices in room - Show when expanded */}
              {expandedRooms.includes(room.id) && (
                <div className="devices-list">
                  {room.devices.length === 0 ? (
                    <p className="no-devices">Chưa có thiết bị nào trong phòng này</p>
                  ) : (
                    room.devices.map(device => (
                      <div key={device.id} className="device-item">
                        <div className="device-info">
                          <span className="device-icon">{getDeviceIcon(device.type)}</span>
                          <div className="device-details">
                            <span className="device-name">{device.name}</span>
                            <span className="device-type">({device.type})</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleDeleteDevice(room.id, device.id, device.name)}
                          className="btn-danger-small"
                        >
                          ×
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RoomManagementSection;
