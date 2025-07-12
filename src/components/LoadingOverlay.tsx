import React from 'react';

type LoadingOverlayProps = {
  isVisible: boolean;
  message?: string;
};

const LoadingOverlay = ({ isVisible, message = 'Loading...' }: LoadingOverlayProps) => {
  if (!isVisible) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="loading-spinner"></div>
        <p className="loading-message">{message}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
