import React from 'react';
import { LightDevice, ACDevice, OtherDevice } from '../types';
import ToggleSwitch from './ToggleSwitch';
import './DeviceGroup.css';

interface DeviceGroupProps {
  roomId: string;
  lights: LightDevice[];
  acs: ACDevice[];
  others: OtherDevice[];
  onToggleDevice: (roomId: string, deviceId: string) => void;
  onUpdateBrightness: (roomId: string, lightId: string, brightness: number) => void;
  onUpdateAC: (roomId: string, acId: string, settings: any) => void;
}

const DeviceGroup: React.FC<DeviceGroupProps> = ({
  roomId,
  lights,
  acs,
  others,
  onToggleDevice,
  onUpdateBrightness,
  onUpdateAC
}) => {
  return (
    <div className="device-groups">
      {/* Lights Group */}
      {lights.length > 0 && (
        <div className="device-group">
          <h4 className="group-title">💡 Đèn ({lights.length})</h4>
          <div className="devices-grid">
            {lights.map((light) => (
              <div key={light.id} className="device-card light-card">
                <div className="device-header">
                  <span className="device-name">{light.name}</span>
                  <ToggleSwitch
                    isOn={light.status === 'on'}
                    onToggle={() => onToggleDevice(roomId, light.id)}
                  />
                </div>
                <div className="device-content">
                  <div className="brightness-control">
                    <label>Độ sáng: {light.brightness}%</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={light.brightness}
                      onChange={(e) => onUpdateBrightness(roomId, light.id, Number(e.target.value))}
                      className="brightness-slider"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ACs Group */}
      {acs.length > 0 && (
        <div className="device-group">
          <h4 className="group-title">❄️ Máy lạnh ({acs.length})</h4>
          <div className="devices-grid">
            {acs.map((ac) => (
              <div key={ac.id} className="device-card ac-card">
                <div className="device-header">
                  <span className="device-name">{ac.name}</span>
                  <ToggleSwitch
                    isOn={ac.status === 'on'}
                    onToggle={() => onToggleDevice(roomId, ac.id)}
                  />
                </div>
                <div className="device-content">
                  <div className="ac-controls">
                    <div className="ac-control-row">
                      <label>Nhiệt độ: {ac.temperature}°C</label>
                      <input
                        type="range"
                        min="16"
                        max="30"
                        value={ac.temperature}
                        onChange={(e) => onUpdateAC(roomId, ac.id, { temperature: Number(e.target.value) })}
                        className="temp-slider"
                        disabled={ac.status === 'off'}
                      />
                    </div>
                    <div className="ac-control-row">
                      <label>Chế độ:</label>
                      <select
                        value={ac.mode}
                        onChange={(e) => onUpdateAC(roomId, ac.id, { mode: e.target.value })}
                        disabled={ac.status === 'off'}
                        className="ac-select"
                      >
                        <option value="cool">❄️ Lạnh</option>
                        <option value="heat">🔥 Nóng</option>
                        <option value="fan">🌀 Quạt</option>
                        <option value="auto">🤖 Tự động</option>
                      </select>
                    </div>
                    <div className="ac-control-row">
                      <label>Quạt:</label>
                      <select
                        value={ac.fan}
                        onChange={(e) => onUpdateAC(roomId, ac.id, { fan: e.target.value })}
                        disabled={ac.status === 'off'}
                        className="ac-select"
                      >
                        <option value="low">🔽 Thấp</option>
                        <option value="medium">➡️ Vừa</option>
                        <option value="high">🔼 Cao</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Others Group */}
      {others.length > 0 && (
        <div className="device-group">
          <h4 className="group-title">📱 Thiết bị khác ({others.length})</h4>
          <div className="devices-grid">
            {others.map((device) => (
              <div key={device.id} className="device-card other-card">
                <div className="device-header">
                  <div className="device-info">
                    <span className="device-icon">
                      {device.type === 'tv' ? '📺' : 
                       device.type === 'fan' ? '🌀' : 
                       device.type === 'speaker' ? '🔊' : '📱'}
                    </span>
                    <span className="device-name">{device.name}</span>
                  </div>
                  <ToggleSwitch
                    isOn={device.status === 'on'}
                    onToggle={() => onToggleDevice(roomId, device.id)}
                  />
                </div>
                <div className="device-status">
                  <span className={`status-text ${device.status}`}>
                    {device.status === 'on' ? '🟢 Đang hoạt động' : '🔴 Tắt'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceGroup;
