import React from 'react';

type ToggleSwitchProps = {
  isOn: boolean;
  onToggle: () => void;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  label?: string;
};

const ToggleSwitch = ({ 
  isOn, 
  onToggle, 
  size = 'medium', 
  disabled = false, 
  label 
}: ToggleSwitchProps) => {
  return (
    <div className={`toggle-switch-container ${size}`}>
      {label && <span className="toggle-label">{label}</span>}
      <button
        className={`toggle-switch ${isOn ? 'on' : 'off'} ${size} ${disabled ? 'disabled' : ''}`}
        onClick={onToggle}
        disabled={disabled}
        aria-label={label || (isOn ? 'Turn off' : 'Turn on')}
      >
        <span className="toggle-slider">
          <span className="toggle-thumb"></span>
        </span>
      </button>
    </div>
  );
};

export default ToggleSwitch;
