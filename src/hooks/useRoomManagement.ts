import { useState } from 'react';
import { Room, Device } from '../types';

// Utility function to generate unique IDs
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Mock data ban đầu
const initialRooms: Room[] = [
  {
    id: 'livingroom',
    name: 'Phòng khách',
    icon: '🛋',
    devices: [
      { id: 'light-1', type: 'light', name: 'Đèn chính', status: 'on', roomId: 'livingroom' },
      { id: 'sensor-1', type: 'sensor', name: 'Nhiệt độ', status: 'active', roomId: 'livingroom' }
    ]
  },
  {
    id: 'bedroom',
    name: 'Phòng ngủ',
    icon: '🛏',
    devices: []
  }
];

export const useRoomManagement = () => {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);

  const addRoom = (name: string, icon: string): void => {
    const newRoom: Room = {
      id: generateId(),
      name,
      icon,
      devices: []
    };
    setRooms(prev => [...prev, newRoom]);
    
    // TODO: Gọi API để lưu vào database
    console.log('Would call API to add room:', newRoom);
  };

  const addDeviceToRoom = (roomId: string, device: Omit<Device, 'id' | 'roomId'>): void => {
    const newDevice: Device = {
      ...device,
      id: generateId(),
      roomId
    };

    setRooms(prev => prev.map(room => 
      room.id === roomId 
        ? { ...room, devices: [...room.devices, newDevice] }
        : room
    ));

    // TODO: Gọi API để lưu thiết bị vào database
    console.log('Would call API to add device:', newDevice);
  };

  const removeDeviceFromRoom = (roomId: string, deviceId: string): void => {
    setRooms(prev => prev.map(room => 
      room.id === roomId 
        ? { ...room, devices: room.devices.filter(device => device.id !== deviceId) }
        : room
    ));

    // TODO: Gọi API để xóa thiết bị khỏi database
    console.log('Would call API to remove device:', deviceId);
  };

  const removeRoom = (roomId: string): void => {
    setRooms(prev => prev.filter(room => room.id !== roomId));
    
    // TODO: Gọi API để xóa phòng khỏi database
    console.log('Would call API to remove room:', roomId);
  };

  const updateRoom = (roomId: string, updates: Partial<Pick<Room, 'name' | 'icon'>>): void => {
    setRooms(prev => prev.map(room => 
      room.id === roomId 
        ? { ...room, ...updates }
        : room
    ));

    // TODO: Gọi API để cập nhật phòng trong database
    console.log('Would call API to update room:', roomId, updates);
  };

  return {
    rooms,
    addRoom,
    addDeviceToRoom,
    removeDeviceFromRoom,
    removeRoom,
    updateRoom
  };
};
