import React from 'react';
import Card from '../components/Card';
import { EnergyDevice } from '../types';
import './EnergyManagementCard.css';

interface EnergyManagementCardProps {
  device: EnergyDevice;
}

export const EnergyManagementCard: React.FC<EnergyManagementCardProps> = ({ device }) => {
  const formatPower = (watts: number) => {
    if (watts >= 1000) {
      return `${(watts / 1000).toFixed(1)}kW`;
    }
    return `${watts}W`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const getConsumptionLevel = (watts: number) => {
    if (watts < 500) return 'low';
    if (watts < 1500) return 'medium';
    return 'high';
  };

  const consumptionLevel = getConsumptionLevel(device.powerConsumption);

  return (
    <Card className={`energy-management-card ${consumptionLevel}`}>
      <div className="energy-header">
        <div className="energy-info">
          <h3>{device.name}</h3>
          <div className="energy-status">
            <span className="status-indicator" />
            {device.status === 'active' ? 'Đang hoạt động' : 'Không hoạt động'}
          </div>
        </div>
        <div className="energy-icon">
          <span className="icon">⚡</span>
        </div>
      </div>

      <div className="energy-metrics">
        {/* Current Power Consumption */}
        <div className="metric-card power-consumption">
          <div className="metric-icon">🔌</div>
          <div className="metric-content">
            <div className="metric-value">{formatPower(device.powerConsumption)}</div>
            <div className="metric-label">Tiêu thụ hiện tại</div>
          </div>
        </div>

        {/* Daily Usage */}
        <div className="metric-card daily-usage">
          <div className="metric-icon">📊</div>
          <div className="metric-content">
            <div className="metric-value">{device.dailyUsage} kWh</div>
            <div className="metric-label">Sử dụng hôm nay</div>
          </div>
        </div>

        {/* Monthly Cost */}
        <div className="metric-card monthly-cost">
          <div className="metric-icon">💰</div>
          <div className="metric-content">
            <div className="metric-value">{formatCurrency(device.monthlyCost)}</div>
            <div className="metric-label">Chi phí tháng này</div>
          </div>
        </div>
      </div>

      <div className="energy-level-indicator">
        <div className="level-label">Mức tiêu thụ:</div>
        <div className={`level-badge ${consumptionLevel}`}>
          {consumptionLevel === 'low' && '🟢 Thấp'}
          {consumptionLevel === 'medium' && '🟡 Trung bình'}
          {consumptionLevel === 'high' && '🔴 Cao'}
        </div>
      </div>

      <div className="energy-progress">
        <div className="progress-label">Tiến độ sử dụng tháng này</div>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${Math.min(100, (device.dailyUsage * 30) / 500 * 100)}%` }}
          />
        </div>
        <div className="progress-info">
          <span>{(device.dailyUsage * 30).toFixed(1)} kWh</span>
          <span>/ 500 kWh</span>
        </div>
      </div>
    </Card>
  );
};
