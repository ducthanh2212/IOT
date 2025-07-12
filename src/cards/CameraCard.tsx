import React from "react";
import { CameraDevice } from "../types";

type CameraCardProps = {
  camera: CameraDevice;
};

const CameraCard = ({ camera }: CameraCardProps) => (
  <div className="card camera-card">
    <div className="card-header">
      <h4>{camera.name}</h4>
      <span className="icon">📹</span>
    </div>
    <div className="card-content">
      <div className="camera-preview">
        {camera.thumbnailUrl ? (
          <img src={camera.thumbnailUrl} alt={camera.name} />
        ) : (
          <div className="camera-placeholder">
            <span>📷</span>
            <p>Camera Feed</p>
          </div>
        )}
      </div>
      <p className="status">{camera.status}</p>
    </div>
  </div>
);

export default CameraCard;
