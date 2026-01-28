import React from "react";
import "./SettingsDropdown.css";

import moonIcon from "../../../icons/user.svg";
import sunIcon from "../../../icons/videos.svg";
import legalIcon from "../../../icons/modules.svg";

import { useTheme } from "../../../context/ThemeContext";

const SettingsDropdown = ({ isOpen }) => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";

  if (!isOpen) return null;

  return (
    <div className="settings-dropdown-wrapper">
      <div className="settings-arrow-top" />
      <div className="settings-glass-card">

        {/* THEME TOGGLE */}
        <div className="settings-option" onClick={toggleTheme}>
          <div className="option-left">
            <div className="option-icon-bg">
              <img src={isDarkMode ? moonIcon : sunIcon} alt="theme" />
            </div>
            <span className="option-text">Theme</span>
          </div>

          <div className={`custom-toggle ${isDarkMode ? "toggle-on" : ""}`}>
            <div className="toggle-handle" />
          </div>
        </div>

        <div className="settings-divider" />

        {/* LEGAL */}
        <div className="settings-label-header">Legal</div>

        <button className="settings-option-btn">
          <div className="option-left">
            <div className="option-icon-bg">
              <img src={legalIcon} alt="legal" />
            </div>
            <span className="option-text">Terms of Service</span>
          </div>
        </button>

        <button className="settings-option-btn">
          <div className="option-left">
            <div className="option-icon-bg">
              <img src={legalIcon} alt="legal" />
            </div>
            <span className="option-text">Privacy Policy</span>
          </div>
        </button>

      </div>
    </div>
  );
};

export default SettingsDropdown;
