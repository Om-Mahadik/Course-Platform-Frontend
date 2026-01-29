import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./TopBar.css";

import UserDropdown from "./utility/UserDropdown";
import SettingsDropdown from "./utility/SettingsDropdown";

import settingsIcon from "../../icons/settings.svg";

import userIcon from "../../icons/user.svg";
import dropdownArrow from "../../icons/dropdown-arrow.svg";


const TopBar = () => {
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [user, setUser] = useState(null);

  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname.split("/").filter(Boolean).pop();
    if (!path) return "Dashboard";
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  // 🔥 SAME USER FETCH LOGIC AS MTopBar
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await firebaseUser.reload();

        const photo =
          firebaseUser.photoURL ||
          firebaseUser.providerData?.[0]?.photoURL;

        setUser({
          name: firebaseUser.displayName || "User",
          email: firebaseUser.email,
          photo,
          uid: firebaseUser.uid,
          role: "user",
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleUser = () => {
    if (!user) return;
    setIsUserOpen(!isUserOpen);
    setIsSettingsOpen(false);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
    setIsUserOpen(false);
  };

  return (
    <header className="topbar-container">
      <h2 className="topbar-title">{getPageTitle()}</h2>

      <div className="topbar-actions">
        {/* USER */}
        <div className="user-menu-wrapper">
          <div className="user-pill" onClick={toggleUser}>
            <img src={userIcon} alt="User" className="user-icon-svg" />

            <span className="user-name">{user?.name || "User"}</span>
              
            <img
              src={dropdownArrow}
              alt="Open"
              className={`dropdown-arrow ${isUserOpen ? "open" : ""}`}
            />
              
          </div>

          <UserDropdown isOpen={isUserOpen} user={user} />
        </div>

        {/* SETTINGS */}
        <div className="user-menu-wrapper">
          <button
            className={`settings-btn ${isSettingsOpen ? "active" : ""}`}
            onClick={toggleSettings}
          >
            <img src={settingsIcon} alt="Settings" />
          </button>

          <SettingsDropdown isOpen={isSettingsOpen} />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
