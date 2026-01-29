import React, { useState } from "react";
import "./SettingsDropdown.css";

import moonIcon from "../../../icons/user.svg";
import sunIcon from "../../../icons/videos.svg";
import legalIcon from "../../../icons/modules.svg";

import { useTheme } from "../../../context/ThemeContext";
import TermsPopup from "../../universal/legal/TermsPopup"; // import your popup

const SettingsDropdown = ({ isOpen }) => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";

  // State for popup
  const [showTerms, setShowTerms] = useState(false);
  const [popupContent, setPopupContent] = useState({ title: "", content: null });

  if (!isOpen) return null;

  // Function to open popup with specific content
  const openPopup = (title, content) => {
    setPopupContent({ title, content });
    setShowTerms(true);
  };

  return (
    <>
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

          <button
            className="settings-option-btn"
            onClick={() =>
              openPopup(
                "Terms of Service",
                <div>
                  <p>Here goes your Terms of Service content...</p>
                  <p>Use multiple paragraphs or HTML as needed.</p>
                </div>
              )
            }
          >
            <div className="option-left">
              <div className="option-icon-bg">
                <img src={legalIcon} alt="legal" />
              </div>
              <span className="option-text">Terms of Service</span>
            </div>
          </button>



        </div>
      </div>

      {/* Bottom Popup */}
      <TermsPopup
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
        title={popupContent.title}
        content={popupContent.content}
      />
    </>
  );
};

export default SettingsDropdown;
