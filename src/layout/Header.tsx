import React, { useState, useEffect } from "react";
import { User } from "../types";

type HeaderProps = {
  user: User;
  onToggleTheme: () => void;
};

const Header = ({ user, onToggleTheme }: HeaderProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleString('vi-VN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1>Dashboard</h1>
        <span className="current-time">{formatTime(currentTime)}</span>
      </div>
      <div className="header-right">
        <button 
          className="theme-toggle"
          onClick={onToggleTheme}
          title="Toggle theme"
        >
          {user.isDarkMode ? '☀️' : '🌙'}
        </button>
        <div className="user-info">
          <span className="user-name">{user.name}</span>
          <div className="user-avatar">
            {user.avatar ? (
              <img src={user.avatar} alt="User avatar" />
            ) : (
              <span>{user.name.charAt(0).toUpperCase()}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
