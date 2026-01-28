import React from "react";
import { useNavigate } from "react-router-dom";
import VideoUpcomingItem from "./VideoSidebarItem"; // Import the item component
import "./SidebarUpcomingGroup.css";
import VideosIcon from "../../../icons/videos.svg";

const SidebarUpcomingGroup = ({ title, videos = [], courseSlug }) => {
  const navigate = useNavigate();

  if (!videos.length) return null;

  return (
    <div className="vd-sidebar-section">
      <h3 className="vd-section-title">
        <img src={VideosIcon} alt="" className="vd-title-icon" />
        {title}
      </h3>

      <div className="vd-upcoming-list">
        {videos.map((video) => (
          <VideoUpcomingItem
            key={video.id}
            video={video}
            onClick={() =>
              navigate(`/users/courses/${courseSlug}/videos/${video.id}`)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default SidebarUpcomingGroup;