import React from "react";
import { SceneDevice } from "../types";

type SceneCardProps = {
  scene: SceneDevice;
  onActivate: (sceneId: string) => void;
};

const SceneCard = ({ scene, onActivate }: SceneCardProps) => (
  <div className={`card scene-card ${scene.status === 'active' ? 'active' : ''}`}>
    <div className="card-header">
      <h4>{scene.name}</h4>
      <span className="icon">🎬</span>
    </div>
    <div className="card-content">
      <p className="description">{scene.description}</p>
      <p className="status">{scene.status}</p>
    </div>
    <div className="card-controls">
      <button 
        className={`activate-btn ${scene.status === 'active' ? 'active' : ''}`}
        onClick={() => onActivate(scene.id)}
      >
        {scene.status === 'active' ? 'Deactivate' : 'Activate'}
      </button>
    </div>
  </div>
);

export default SceneCard;
