import React from "react";
import "./SidebarResourceGroup.css";

// Import Section Header Icons
import ResourcesIcon from "../../../icons/resources.svg";
import LinksIcon from "../../../icons/links.svg";

// Import Item Action Icons
import DownloadIcon from "../../../icons/download.svg";
import RedirectIcon from "../../../icons/redirect.svg";

const SidebarResourceGroup = ({ title, items = [] }) => {
  if (!items.length) return null;

  // Determine header icon based on title
  const isResourceSection = title.toLowerCase().includes("resource");
  const HeaderIcon = isResourceSection ? ResourcesIcon : LinksIcon;

  return (
    <div className="vd-sidebar-section">
      <h3 className="vd-section-title">
        <img src={HeaderIcon} alt="" className="vd-title-icon" />
        {title}
      </h3>

      <div className="vd-resource-list">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="vd-resource-card"
          >
            <span className="vd-resource-name">{item.name}</span>
            <img 
              src={isResourceSection ? DownloadIcon : RedirectIcon} 
              alt="" 
              /* Conditional class to fix the redirect arrow size */
              className={`vd-action-icon ${!isResourceSection ? "is-redirect" : "is-download"}`} 
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SidebarResourceGroup;