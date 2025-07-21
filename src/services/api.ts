import { Room, RoomDevices, DashboardData, LightDevice, ACDevice, OtherDevice } from '../types';

// Mock data cho rooms theo mô tả
const mockRooms: Room[] = [
  {
    id: 'bedroom',
    name: 'Phòng ngủ',
    icon: '🛏️',
    temperature: 25,
    humidity: 60,
    energy: {
      power: 130,
      voltage: 220,
      co2: 18
    },
    lights: [
      {
        id: 'light-bedroom-1',
        name: 'Đèn ngủ',
        type: 'light',
        status: 'on',
        brightness: 80
      },
      {
        id: 'light-bedroom-2',
        name: 'Đèn trần',
        type: 'light',
        status: 'off',
        brightness: 0
      }
    ],
    acs: [
      {
        id: 'ac-bedroom-1',
        name: 'Máy lạnh phòng ngủ',
        type: 'ac',
        status: 'on',
        mode: 'cool',
        fan: 'medium',
        temperature: 24
      }
    ],
    others: [
      {
        id: 'tv-bedroom-1',
        name: 'TV Samsung',
        type: 'tv',
        status: 'off'
      },
      {
        id: 'fan-bedroom-1',
        name: 'Quạt trần',
        type: 'fan',
        status: 'on'
      }
    ]
  },
  {
    id: 'living-room',
    name: 'Phòng khách',
    icon: '🛋️',
    temperature: 27,
    humidity: 55,
    energy: {
      power: 180,
      voltage: 220,
      co2: 22
    },
    lights: [
      {
        id: 'light-living-1',
        name: 'Đèn chùm',
        type: 'light',
        status: 'on',
        brightness: 100
      },
      {
        id: 'light-living-2',
        name: 'Đèn trang trí',
        type: 'light',
        status: 'on',
        brightness: 60
      }
    ],
    acs: [
      {
        id: 'ac-living-1',
        name: 'Máy lạnh chính',
        type: 'ac',
        status: 'on',
        mode: 'cool',
        fan: 'high',
        temperature: 22
      }
    ],
    others: [
      {
        id: 'tv-living-1',
        name: 'Smart TV 65"',
        type: 'tv',
        status: 'on'
      },
      {
        id: 'speaker-living-1',
        name: 'Loa Bluetooth',
        type: 'speaker',
        status: 'on'
      }
    ]
  },
  {
    id: 'kitchen',
    name: 'Phòng bếp',
    icon: '🍳',
    temperature: 29,
    humidity: 65,
    energy: {
      power: 220,
      voltage: 220,
      co2: 28
    },
    lights: [
      {
        id: 'light-kitchen-1',
        name: 'Đèn bếp',
        type: 'light',
        status: 'on',
        brightness: 90
      }
    ],
    acs: [],
    others: [
      {
        id: 'fan-kitchen-1',
        name: 'Quạt hút mùi',
        type: 'fan',
        status: 'on'
      }
    ]
  },
  {
    id: 'bathroom',
    name: 'Phòng tắm',
    icon: '🚿',
    temperature: 26,
    humidity: 80,
    energy: {
      power: 90,
      voltage: 220,
      co2: 15
    },
    lights: [
      {
        id: 'light-bathroom-1',
        name: 'Đèn phòng tắm',
        type: 'light',
        status: 'off',
        brightness: 0
      }
    ],
    acs: [],
    others: [
      {
        id: 'heater-bathroom-1',
        name: 'Bình nóng lạnh',
        type: 'other',
        status: 'on'
      }
    ]
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API Functions
export const getRooms = async (): Promise<Room[]> => {
  await delay(800);
  return [...mockRooms];
};

export const getDashboardData = async (): Promise<DashboardData> => {
  await delay(800);
  const devices: Record<string, RoomDevices> = {};
  
  mockRooms.forEach(room => {
    devices[room.id] = {
      lights: room.lights,
      acs: room.acs,
      others: room.others
    };
  });

  return {
    rooms: [...mockRooms],
    devices: devices
  };
};

export const toggleDevice = async (roomId: string, deviceId: string): Promise<void> => {
  await delay(300);
  
  const room = mockRooms.find(r => r.id === roomId);
  if (!room) return;

  // Find and toggle device in lights
  const light = room.lights.find(l => l.id === deviceId);
  if (light) {
    light.status = light.status === 'on' ? 'off' : 'on';
    if (light.status === 'off') light.brightness = 0;
    return;
  }

  // Find and toggle device in acs
  const ac = room.acs.find(a => a.id === deviceId);
  if (ac) {
    ac.status = ac.status === 'on' ? 'off' : 'on';
    return;
  }

  // Find and toggle device in others
  const other = room.others.find(o => o.id === deviceId);
  if (other) {
    other.status = other.status === 'on' ? 'off' : 'on';
    return;
  }
};

export const updateLightBrightness = async (roomId: string, lightId: string, brightness: number): Promise<void> => {
  await delay(300);
  
  const room = mockRooms.find(r => r.id === roomId);
  if (!room) return;

  const light = room.lights.find(l => l.id === lightId);
  if (light) {
    light.brightness = brightness;
    light.status = brightness > 0 ? 'on' : 'off';
  }
};

export const updateACSettings = async (
  roomId: string, 
  acId: string, 
  settings: { temperature?: number; mode?: string; fan?: string }
): Promise<void> => {
  await delay(300);
  
  const room = mockRooms.find(r => r.id === roomId);
  if (!room) return;

  const ac = room.acs.find(a => a.id === acId);
  if (ac) {
    if (settings.temperature) ac.temperature = settings.temperature;
    if (settings.mode) ac.mode = settings.mode as any;
    if (settings.fan) ac.fan = settings.fan as any;
  }
};
