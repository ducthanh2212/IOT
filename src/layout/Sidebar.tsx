import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { id: 'home', label: 'Home', icon: '🏠', path: '/' },
    { id: 'person', label: 'Person', icon: '👤', path: '/person' },
    { id: 'energy', label: 'Energy', icon: '⚡', path: '/energy' },
    { id: 'settings', label: 'Settings', icon: '⚙️', path: '/settings' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">Demo</div>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <Link
            key={item.id}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            title={item.label}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-tooltip">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
