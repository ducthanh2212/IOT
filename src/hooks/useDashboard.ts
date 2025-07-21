import { useState, useEffect } from 'react';
import { DashboardData, Room } from '../types';
import { getDashboardData } from '../services/api';

export const useDashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const dashboardData = await getDashboardData();
        setData(dashboardData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleDevice = (deviceId: string) => {
    if (!data) return;

    const updatedData = { ...data };
    let deviceFound = false;

    updatedData.rooms.forEach((room: Room) => {
      // Check lights
      room.devices.lights.forEach((device) => {
        if (device.id === deviceId) {
          device.status = device.status === 'on' ? 'off' : 'on';
          deviceFound = true;
        }
      });

      // Check cameras
      room.devices.cameras.forEach((device) => {
        if (device.id === deviceId) {
          device.status = device.status === 'active' ? 'inactive' : 'active';
          deviceFound = true;
        }
      });

      // Check scenes
      room.devices.scenes.forEach((device) => {
        if (device.id === deviceId) {
          device.status = device.status === 'active' ? 'inactive' : 'active';
          deviceFound = true;
        }
      });

      // Check air conditioners
      room.devices.airConditioners.forEach((device) => {
        if (device.id === deviceId) {
          device.status = device.status === 'on' ? 'off' : 'on';
          deviceFound = true;
        }
      });
    });

    if (deviceFound) {
      setData(updatedData);
    }
  };

  const updateLightBrightness = (deviceId: string, brightness: number) => {
    if (!data) return;

    const updatedData = { ...data };
    let deviceFound = false;

    updatedData.rooms.forEach((room: Room) => {
      room.devices.lights.forEach((device) => {
        if (device.id === deviceId) {
          device.brightness = brightness;
          deviceFound = true;
        }
      });
    });

    if (deviceFound) {
      setData(updatedData);
    }
  };

  const updateAirConditionerTemperature = (deviceId: string, temperature: number) => {
    if (!data) return;

    const updatedData = { ...data };
    let deviceFound = false;

    updatedData.rooms.forEach((room: Room) => {
      room.devices.airConditioners.forEach((device) => {
        if (device.id === deviceId) {
          device.temperature = temperature;
          deviceFound = true;
        }
      });
    });

    if (deviceFound) {
      setData(updatedData);
    }
  };

  const updateAirConditionerMode = (deviceId: string, mode: 'cool' | 'heat' | 'fan' | 'auto') => {
    if (!data) return;

    const updatedData = { ...data };
    let deviceFound = false;

    updatedData.rooms.forEach((room: Room) => {
      room.devices.airConditioners.forEach((device) => {
        if (device.id === deviceId) {
          device.mode = mode;
          deviceFound = true;
        }
      });
    });

    if (deviceFound) {
      setData(updatedData);
    }
  };

  const updateAirConditionerFanSpeed = (deviceId: string, fanSpeed: 'auto' | 'low' | 'medium' | 'high') => {
    if (!data) return;

    const updatedData = { ...data };
    let deviceFound = false;

    updatedData.rooms.forEach((room: Room) => {
      room.devices.airConditioners.forEach((device) => {
        if (device.id === deviceId) {
          device.fanSpeed = fanSpeed;
          deviceFound = true;
        }
      });
    });

    if (deviceFound) {
      setData(updatedData);
    }
  };

  return {
    data,
    loading,
    error,
    toggleDevice,
    updateLightBrightness,
    updateAirConditionerTemperature,
    updateAirConditionerMode,
    updateAirConditionerFanSpeed,
    refetch: () => {
      setError(null);
      const fetchData = async () => {
        try {
          setLoading(true);
          const dashboardData = await getDashboardData();
          setData(dashboardData);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    },
  };
};
