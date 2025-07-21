import React from 'react';

interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ 
  isOn, 
  onToggle, 
  disabled = false,
  size = 'medium'
}) => {
  return (
    <div 
      className={`toggle-switch ${size} ${isOn ? 'on' : 'off'} ${disabled ? 'disabled' : ''}`}
      onClick={disabled ? undefined : onToggle}
    >
      <div className="toggle-slider">
        <div className="toggle-thumb" />
      </div>
    </div>
  );
};

export default ToggleSwitch;
