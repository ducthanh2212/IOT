export interface Device {
  id: string;
  name: string;
  type: 'light' | 'sensor' | 'camera' | 'scene';
  status: 'on' | 'off' | 'active' | 'inactive';
  roomId?: string;
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

export interface Room {
  id: string;
  name: string;
  icon: string;
  devices: Device[];
}

export interface DashboardData {
  lights: LightDevice[];
  sensors: SensorDevice[];
  cameras: CameraDevice[];
  scenes: SceneDevice[];
  rooms: Room[];
}

export interface User {
  name: string;
  avatar?: string;
  isDarkMode: boolean;
}
