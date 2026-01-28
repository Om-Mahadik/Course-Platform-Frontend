import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./TopBar.css";

const TopBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Convert path like "/courses" to "Courses"
  const getPageTitle = () => {
    const path = location.pathname.split("/").filter(Boolean).pop();
    if (!path) return "Dashboard";
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  const handleLogout = () => {
    // 🔥 clear auth
    localStorage.removeItem("user");

    // 🔥 hard redirect = fresh auth check
    window.location.href = "/login";
  };

  return (
    <header className="topbar-container">
      <h2 className="topbar-title">{getPageTitle()}</h2>

      <div className="user-section-wrapper">
        <div className="user-pill" onClick={() => setIsOpen(!isOpen)}>
          <span className="user-icon">👤</span>
          <span className="user-name">Prachi Tupe</span>
          <span className={`chevron ${isOpen ? "open" : ""}`}>▾</span>
        </div>

        {isOpen && (
          <div className="user-drawer">
            <div className="drawer-item">Profile</div>
            <div className="drawer-item">Settings</div>
            <hr />
            <div
              className="drawer-item logout"
              onClick={handleLogout}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopBar;
