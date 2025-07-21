import React from 'react';
import Card from '../components/Card';
import { AirConditionerDevice } from '../types';
import './AirConditionerCard.css';

interface AirConditionerCardProps {
  device: AirConditionerDevice;
  onToggle: (deviceId: string) => void;
  onTemperatureChange: (deviceId: string, temperature: number) => void;
  onModeChange: (deviceId: string, mode: string) => void;
  onFanSpeedChange: (deviceId: string, fanSpeed: string) => void;
}

export const AirConditionerCard: React.FC<AirConditionerCardProps> = ({
  device,
  onToggle,
  onTemperatureChange,
  onModeChange,
  onFanSpeedChange,
}) => {
  const isOn = device.status === 'on';

  const handleTemperatureChange = (change: number) => {
    const newTemp = Math.max(16, Math.min(30, device.temperature + change));
    onTemperatureChange(device.id, newTemp);
  };

  const modeOptions = [
    { value: 'cool', label: 'Làm lạnh', icon: '❄️' },
    { value: 'heat', label: 'Sưởi ấm', icon: '🔥' },
    { value: 'auto', label: 'Tự động', icon: '🔄' },
    { value: 'fan', label: 'Quạt gió', icon: '💨' },
  ];

  const fanSpeedOptions = [
    { value: 'low', label: 'Thấp' },
    { value: 'medium', label: 'Trung bình' },
    { value: 'high', label: 'Cao' },
    { value: 'auto', label: 'Tự động' },
  ];

  return (
    <Card className={`air-conditioner-card ${isOn ? 'on' : 'off'}`}>
      <div className="air-conditioner-header">
        <div className="air-conditioner-info">
          <h3>{device.name}</h3>
          <div className="air-conditioner-status">
            <span className="status-indicator" />
            {isOn ? 'Đang bật' : 'Đã tắt'}
          </div>
        </div>
        <button
          className={`power-button ${isOn ? 'on' : 'off'}`}
          onClick={() => onToggle(device.id)}
        >
          <span className="power-icon">⏻</span>
        </button>
      </div>

      {isOn && (
        <div className="air-conditioner-controls">
          {/* Temperature Control */}
          <div className="temperature-control">
            <div className="temperature-display">
              <span className="temperature-value">{device.temperature}°C</span>
              <span className="temperature-label">Nhiệt độ</span>
            </div>
            <div className="temperature-buttons">
              <button
                className="temp-button"
                onClick={() => handleTemperatureChange(-1)}
                disabled={device.temperature <= 16}
              >
                -
              </button>
              <button
                className="temp-button"
                onClick={() => handleTemperatureChange(1)}
                disabled={device.temperature >= 30}
              >
                +
              </button>
            </div>
          </div>

          {/* Mode Control */}
          <div className="mode-control">
            <label className="control-label">Chế độ:</label>
            <div className="mode-options">
              {modeOptions.map((mode) => (
                <button
                  key={mode.value}
                  className={`mode-button ${device.mode === mode.value ? 'active' : ''}`}
                  onClick={() => onModeChange(device.id, mode.value)}
                  title={mode.label}
                >
                  <span className="mode-icon">{mode.icon}</span>
                  <span className="mode-label">{mode.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Fan Speed Control */}
          <div className="fan-speed-control">
            <label className="control-label">Tốc độ quạt:</label>
            <div className="fan-speed-options">
              {fanSpeedOptions.map((speed) => (
                <button
                  key={speed.value}
                  className={`fan-speed-button ${device.fanSpeed === speed.value ? 'active' : ''}`}
                  onClick={() => onFanSpeedChange(device.id, speed.value)}
                >
                  {speed.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
