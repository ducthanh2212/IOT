import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { User } from "../types";

type MainLayoutProps = {
  children: React.ReactNode;
  user: User;
  onToggleTheme: () => void;
};

const MainLayout = ({ children, user, onToggleTheme }: MainLayoutProps) => {
  return (
    <div className={`main-layout ${user.isDarkMode ? 'dark' : 'light'}`}>
      <Sidebar />
      <div className="content-area">
        <Header user={user} onToggleTheme={onToggleTheme} />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
