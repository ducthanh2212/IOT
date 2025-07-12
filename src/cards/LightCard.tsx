import React from "react";
import { LightDevice } from "../types";

type LightCardProps = {
  light: LightDevice;
  onToggle: (lightId: string) => void;
  onBrightnessChange?: (lightId: string, brightness: number) => void;
};

const LightCard = ({ light, onToggle }: LightCardProps) => {
  const handleToggle = () => {
    onToggle(light.id);
  };

  return (
    <div className={`card light-card-simple ${light.status === 'on' ? 'active' : ''}`}>
      <div className="card-header">
        <h4>{light.name}</h4>
        <span className="light-icon">💡</span>
      </div>
      <div className="card-content">
        <p className="light-status">
          {light.status === 'on' ? `Mở - ${light.brightness}%` : 'Tắt'}
        </p>
        <p className="light-time">Inactive</p>
      </div>
      <div className="card-controls">
        <button
          className={`activate-btn ${light.status === 'on' ? 'active' : ''}`}
          onClick={handleToggle}
        >
          {light.status === 'on' ? 'Deactivate' : 'Activate'}
        </button>
      </div>
    </div>
  );
};

export default LightCard;
