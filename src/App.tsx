import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import Settings from './pages/Settings';
import { User } from './types';
import './App.css';

const App = () => {
  const [user, setUser] = useState<User>({
    name: 'DU',
    isDarkMode: false,
  });

  const toggleTheme = () => {
    setUser(prev => ({ ...prev, isDarkMode: !prev.isDarkMode }));
  };

  return (
    <Router>
      <MainLayout user={user} onToggleTheme={toggleTheme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;