import React from "react";
import { SensorDevice } from "../types";

type SensorCardProps = {
  sensor: SensorDevice;
};

const SensorCard = ({ sensor }: SensorCardProps) => (
  <div className="card sensor-card">
    <div className="card-header">
      <h4>{sensor.name}</h4>
      <span className="icon">{sensor.icon}</span>
    </div>
    <div className="card-content">
      <p className="value">
        {sensor.value}{sensor.unit && ` ${sensor.unit}`}
      </p>
      <p className="status">{sensor.status}</p>
    </div>
  </div>
);

export default SensorCard;
