import { useState } from 'react';
import { Room, RoomDevices } from '../types';

export const useRoomManagement = () => {
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: 'living-room',
      name: 'Phòng khách',
      icon: '🛋️',
      devices: {
        lights: [],
        sensors: [],
        cameras: [],
        scenes: [],
        airConditioners: [],
        energyManagement: [],
      },
    },
    {
      id: 'bedroom',
      name: 'Phòng ngủ',
      icon: '🛏️',
      devices: {
        lights: [],
        sensors: [],
        cameras: [],
        scenes: [],
        airConditioners: [],
        energyManagement: [],
      },
    },
  ]);

  const addRoom = (name: string, icon: string) => {
    const newRoom: Room = {
      id: Date.now().toString(),
      name,
      icon,
      devices: {
        lights: [],
        sensors: [],
        cameras: [],
        scenes: [],
        airConditioners: [],
        energyManagement: [],
      },
    };
    setRooms(prev => [...prev, newRoom]);
  };

  const getTotalDevicesCount = (devices: RoomDevices): number => {
    return devices.lights.length + 
           devices.sensors.length + 
           devices.cameras.length + 
           devices.scenes.length + 
           devices.airConditioners.length + 
           devices.energyManagement.length;
  };

  const addDeviceToRoom = (roomId: string, device: any) => {
    setRooms(prev => prev.map(room => {
      if (room.id !== roomId) return room;
      
      const newDevices = { ...room.devices };
      const deviceType = device.type + 's';
      
      if (deviceType in newDevices) {
        (newDevices as any)[deviceType] = [...(newDevices as any)[deviceType], device];
      }
      
      return { ...room, devices: newDevices };
    }));
  };

  const removeRoom = (roomId: string) => {
    setRooms(prev => prev.filter(room => room.id !== roomId));
  };

  const removeDeviceFromRoom = (roomId: string, deviceId: string) => {
    setRooms(prev => prev.map(room => {
      if (room.id !== roomId) return room;
      
      const newDevices = { ...room.devices };
      Object.keys(newDevices).forEach(key => {
        const deviceKey = key as keyof RoomDevices;
        (newDevices as any)[deviceKey] = (newDevices as any)[deviceKey].filter((device: any) => device.id !== deviceId);
      });
      
      return { ...room, devices: newDevices };
    }));
  };

  return {
    rooms,
    addRoom,
    addDeviceToRoom,
    removeRoom,
    removeDeviceFromRoom,
    getTotalDevicesCount,
  };
};
