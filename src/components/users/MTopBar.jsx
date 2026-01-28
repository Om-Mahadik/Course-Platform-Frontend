import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./MTopBar.css";
import UserDropdown from "./utility/UserDropdown";
import SettingsDropdown from "./utility/SettingsDropdown"; // Import new component

import logo from "../../imgs/logo.jpg";
import settingsIcon from "../../icons/settings.svg";

const MTopBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // New state
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await firebaseUser.reload();
        const photo = firebaseUser.photoURL || firebaseUser.providerData?.[0]?.photoURL;

        setUser({
          name: firebaseUser.displayName || "User",
          email: firebaseUser.email,
          photo: photo,
          uid: firebaseUser.uid,
          role: "user" 
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Toggle handlers to prevent overlapping menus
  const toggleUserMenu = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsSettingsOpen(false); 
  };

  const toggleSettingsMenu = () => {
    setIsSettingsOpen(!isSettingsOpen);
    setIsDropdownOpen(false);
  };

  return (
    <header className="mobile-header">
      <div className="mobile-logo-section">
        <img src={logo} alt="Logo" className="mobile-logo-img" />
      </div>

      <div className="mobile-actions">
        {/* USER MENU */}
        <div className="user-menu-wrapper">
          <button
            className={`mobile-icon-btn ${isDropdownOpen ? "active" : ""}`}
            onClick={toggleUserMenu}
            disabled={!user}
          >
            {user?.photo ? (
              <img
                src={user.photo}
                alt="Profile"
                className="m-user-avatar-small"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="m-user-initials">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>
            )}
          </button>
          <UserDropdown isOpen={isDropdownOpen} user={user} />
        </div>

        {/* SETTINGS MENU */}
        <div className="user-menu-wrapper">
          <button 
            className={`mobile-icon-btn ${isSettingsOpen ? "active" : ""}`}
            onClick={toggleSettingsMenu}
          >
            <img src={settingsIcon} alt="Settings" className="m-action-svg" />
          </button>
          <SettingsDropdown isOpen={isSettingsOpen} />
        </div>
      </div>
    </header>
  );
};

export default MTopBar;