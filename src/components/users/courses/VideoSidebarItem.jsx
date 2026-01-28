import React from "react";
import VideosIcon from "../../../icons/videos.svg";

const VideoUpcomingItem = ({ video, onClick }) => (
  <div className="vd-upcoming-card" onClick={onClick}>
    <div className="vd-mini-thumb">
      <img
        src={video.thumbnail || "https://via.placeholder.com/160x90?text=Video"}
        alt={video.title}
      />
      <div className="vd-thumb-overlay">
        <img src={VideosIcon} alt="Play" className="vd-play-hint" />
      </div>
    </div>

    <div className="vd-upcoming-info">
      <p className="vd-upcoming-text">{video.title}</p>
      <span className="vd-upcoming-label">Next Lesson</span>
    </div>
  </div>
);

export default VideoUpcomingItem;