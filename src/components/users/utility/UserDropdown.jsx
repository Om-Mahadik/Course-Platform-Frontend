import React from "react";
import "./UserDropdown.css";

const UserDropdown = ({ isOpen, user }) => {
  if (!isOpen || !user) return null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="premium-dropdown-wrapper">
      {/* Top arrow */}
      <div className="dropdown-arrow-top"></div>

      {/* Card container */}
      <div className="premium-dropdown-card">
        {/* USER INFO */}
        <div className="dropdown-user-info">
          <img
            src={user.photo || ""}
            alt="Avatar"
            className="dropdown-avatar"
            referrerPolicy="no-referrer"
          />
          <div className="dropdown-text">
            <span className="dropdown-name">{user.name}</span>
            <span className="dropdown-email">{user.email}</span>
          </div>
        </div>

        <div className="dropdown-divider"></div>


        {/* LOGOUT BUTTON */}
        <button className="black-logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserDropdown;
