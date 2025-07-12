import React from 'react';
import RoomManagementSection from '../components/RoomManagementSection';

const Settings = () => {
  console.log('Settings component rendered');
  
  return (
    <div className="settings">
      <h1>⚙️ Settings</h1>
      <div className="settings-grid">
      <div className="settings-section">
        <h2>General</h2>
        <div className="settings-item">
          <label>Dashboard Name</label>
          <input type="text" defaultValue="Home Assistant Dashboard" />
        </div>
        <div className="settings-item">
          <label>Auto-refresh interval</label>
          <select defaultValue="30">
            <option value="10">10 seconds</option>
            <option value="30">30 seconds</option>
            <option value="60">1 minute</option>
            <option value="300">5 minutes</option>
          </select>
        </div>
      </div>
      
      <div className="settings-section">
        <h2>Appearance</h2>
        <div className="settings-item">
          <label>Theme</label>
          <select defaultValue="auto">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>
        <div className="settings-item">
          <label>Grid columns</label>
          <input type="number" defaultValue="3" min="1" max="6" />
        </div>
      </div>
      
      <div className="settings-section">
        <h2>Devices</h2>
        <div className="settings-item">
          <label>Show offline devices</label>
          <input type="checkbox" defaultChecked />
        </div>
        <div className="settings-item">
          <label>Auto-discover new devices</label>
          <input type="checkbox" defaultChecked />
        </div>
      </div>
      
      {/* Room Management Section */}
      <div className="settings-section room-management-wrapper">
        <RoomManagementSection />
      </div>
    </div>
  </div>
);
};

export default Settings;