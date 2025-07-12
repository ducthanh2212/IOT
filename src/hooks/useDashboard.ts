import { useState, useEffect } from 'react';
import { DashboardData } from '../types';
import { getDashboardData, toggleLight, activateScene, setLightBrightness } from '../services/api';

export const useDashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const dashboardData = await getDashboardData();
      setData(dashboardData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch dashboard data');
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleLight = async (lightId: string) => {
    try {
      setActionLoading(true);
      setActionMessage('Toggling light...');
      await toggleLight(lightId);
      
      // Refresh data silently without showing main loading
      const dashboardData = await getDashboardData();
      setData(dashboardData);
    } catch (err) {
      console.error('Error toggling light:', err);
      setError('Failed to toggle light');
    } finally {
      setActionLoading(false);
      setActionMessage('');
    }
  };

  const handleSetBrightness = async (lightId: string, brightness: number) => {
    try {
      setActionLoading(true);
      setActionMessage('Setting brightness...');
      await setLightBrightness(lightId, brightness);
      
      // Refresh data silently without showing main loading
      const dashboardData = await getDashboardData();
      setData(dashboardData);
    } catch (err) {
      console.error('Error setting brightness:', err);
      setError('Failed to set brightness');
    } finally {
      setActionLoading(false);
      setActionMessage('');
    }
  };

  const handleActivateScene = async (sceneId: string) => {
    try {
      setActionLoading(true);
      setActionMessage('Updating scene...');
      await activateScene(sceneId);
      
      // Refresh data silently without showing main loading
      const dashboardData = await getDashboardData();
      setData(dashboardData);
    } catch (err) {
      console.error('Error activating scene:', err);
      setError('Failed to update scene');
    } finally {
      setActionLoading(false);
      setActionMessage('');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    actionLoading,
    actionMessage,
    error,
    refetch: fetchData,
    toggleLight: handleToggleLight,
    setBrightness: handleSetBrightness,
    activateScene: handleActivateScene,
  };
};
