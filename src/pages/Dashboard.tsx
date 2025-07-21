import React, { useState, useEffect } from 'react';
import { Room } from '../types';
import { getRooms, toggleDevice, updateLightBrightness, updateACSettings } from '../services/api';
import Header from '../components/Header';
import RoomCard from '../components/RoomCard';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load rooms data on component mount
  useEffect(() => {
    const loadRooms = async () => {
      try {
        setLoading(true);
        const roomsData = await getRooms();
        setRooms(roomsData);
      } catch (err) {
        setError('Không thể tải dữ liệu phòng');
        console.error('Error loading rooms:', err);
      } finally {
        setLoading(false);
      }
    };

    loadRooms();
  }, []);

  // Calculate dashboard stats
  const getTotalDevices = (): number => {
    return rooms.reduce((total, room) => 
      total + room.lights.length + room.acs.length + room.others.length, 0
    );
  };

  const getTotalPowerConsumption = (): number => {
    return rooms.reduce((total, room) => total + room.energy.power, 0);
  };

  // Device interaction handlers
  const handleToggleDevice = async (roomId: string, deviceId: string) => {
    try {
      await toggleDevice(roomId, deviceId);
      
      // Update local state
      setRooms(prevRooms => 
        prevRooms.map(room => {
          if (room.id !== roomId) return room;
          
          return {
            ...room,
            lights: room.lights.map(light => 
              light.id === deviceId 
                ? { ...light, status: light.status === 'on' ? 'off' : 'on' }
                : light
            ),
            acs: room.acs.map(ac => 
              ac.id === deviceId 
                ? { ...ac, status: ac.status === 'on' ? 'off' : 'on' }
                : ac
            ),
            others: room.others.map(device => 
              device.id === deviceId 
                ? { ...device, status: device.status === 'on' ? 'off' : 'on' }
                : device
            )
          };
        })
      );
    } catch (err) {
      console.error('Error toggling device:', err);
      setError('Không thể điều khiển thiết bị');
    }
  };

  const handleUpdateBrightness = async (roomId: string, lightId: string, brightness: number) => {
    try {
      await updateLightBrightness(roomId, lightId, brightness);
      
      // Update local state
      setRooms(prevRooms => 
        prevRooms.map(room => {
          if (room.id !== roomId) return room;
          
          return {
            ...room,
            lights: room.lights.map(light => 
              light.id === lightId 
                ? { ...light, brightness }
                : light
            )
          };
        })
      );
    } catch (err) {
      console.error('Error updating brightness:', err);
      setError('Không thể cập nhật độ sáng');
    }
  };

  const handleUpdateAC = async (roomId: string, acId: string, settings: any) => {
    try {
      await updateACSettings(roomId, acId, settings);
      
      // Update local state
      setRooms(prevRooms => 
        prevRooms.map(room => {
          if (room.id !== roomId) return room;
          
          return {
            ...room,
            acs: room.acs.map(ac => 
              ac.id === acId 
                ? { ...ac, ...settings }
                : ac
            )
          };
        })
      );
    } catch (err) {
      console.error('Error updating AC settings:', err);
      setError('Không thể cập nhật máy lạnh');
    }
  };

  // Clear error after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <Header 
        totalRooms={rooms.length}
        totalDevices={getTotalDevices()}
        totalPowerConsumption={getTotalPowerConsumption()}
      />

      {/* Error Banner */}
      {error && (
        <div className="error-banner">
          <span className="error-icon">⚠️</span>
          <span className="error-message">{error}</span>
          <button 
            className="error-close"
            onClick={() => setError(null)}
          >
            ×
          </button>
        </div>
      )}

      {/* Rooms Grid */}
      <main className="dashboard-content">
        <div className="rooms-grid">
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onToggleDevice={handleToggleDevice}
              onUpdateBrightness={handleUpdateBrightness}
              onUpdateAC={handleUpdateAC}
            />
          ))}
        </div>

        {/* Dashboard Stats */}
        <div className="dashboard-footer">
          <div className="stats-summary">
            <div className="stat-item">
              <span className="stat-value">{rooms.length}</span>
              <span className="stat-label">phòng</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{getTotalDevices()}</span>
              <span className="stat-label">thiết bị</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{getTotalPowerConsumption()}</span>
              <span className="stat-label">W</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">
                {Math.round(rooms.reduce((sum, room) => sum + room.temperature, 0) / rooms.length)}°C
              </span>
              <span className="stat-label">nhiệt độ TB</span>
            </div>
          </div>
          <div className="footer-info">
            <p>🏠 IOT Room Dashboard • Cập nhật lần cuối: {new Date().toLocaleTimeString('vi-VN')}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
