export interface Device {
  id: string;
  name: string;
  type: 'light' | 'sensor' | 'camera' | 'scene' | 'air_conditioner' | 'energy_management';
  status: 'on' | 'off' | 'active' | 'inactive';
  roomId: string;
}

export interface LightDevice extends Device {
  type: 'light';
  brightness?: number;
  color?: string;
}

export interface SensorDevice extends Device {
  type: 'sensor';
  value: string;
  unit?: string;
  icon?: string;
}

export interface CameraDevice extends Device {
  type: 'camera';
  streamUrl?: string;
  thumbnailUrl?: string;
}

export interface SceneDevice extends Device {
  type: 'scene';
  description?: string;
}

export interface AirConditionerDevice extends Device {
  type: 'air_conditioner';
  temperature: number; // 16-30°C
  mode: 'cool' | 'heat' | 'fan' | 'auto';
  fanSpeed: 'low' | 'medium' | 'high' | 'auto';
}

export interface EnergyDevice extends Device {
  type: 'energy_management';
  powerConsumption: number; // Watts
  dailyUsage: number; // kWh
  monthlyCost: number; // VND
}

export interface RoomDevices {
  lights: LightDevice[];
  sensors: SensorDevice[];
  cameras: CameraDevice[];
  scenes: SceneDevice[];
  airConditioners: AirConditionerDevice[];
  energyManagement: EnergyDevice[];
}

export interface Room {
  id: string;
  name: string;
  icon: string;
  devices: RoomDevices;
}

export interface GlobalStats {
  totalPowerConsumption: number;
  totalMonthlyCost: number;
  activeDevices: number;
  totalDevices: number;
}

export interface DashboardData {
  rooms: Room[];
  globalStats: GlobalStats;
}

export interface User {
  name: string;
  avatar?: string;
  isDarkMode: boolean;
}
