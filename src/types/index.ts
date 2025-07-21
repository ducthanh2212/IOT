export interface Room {
  id: string;
  name: string;
  icon: string;
  temperature: number;
  humidity: number;
  energy: {
    power: number;
    voltage: number;
    co2: number;
  };
  lights: LightDevice[];
  acs: ACDevice[];
  others: OtherDevice[];
}

export interface LightDevice {
  id: string;
  name: string;
  type: 'light';
  status: 'on' | 'off';
  brightness: number;
}

export interface ACDevice {
  id: string;
  name: string;
  type: 'ac';
  status: 'on' | 'off';
  mode: 'cool' | 'heat' | 'fan' | 'auto';
  fan: 'low' | 'medium' | 'high';
  temperature: number;
}

export interface OtherDevice {
  id: string;
  name: string;
  type: 'tv' | 'fan' | 'speaker' | 'other';
  status: 'on' | 'off';
}

export interface RoomDevices {
  lights: LightDevice[];
  acs: ACDevice[];
  others: OtherDevice[];
}

export interface DashboardData {
  rooms: Room[];
  devices: Record<string, RoomDevices>;
}
