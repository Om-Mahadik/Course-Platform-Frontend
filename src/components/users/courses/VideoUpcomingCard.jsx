import React from 'react';
import './VideoUpcomingCard.css';

// Import your brand icon
import VideosIcon from "../../assets/icons/videos.svg";

const VideoUpcomingCard = ({ video }) => (
  <div className="vd-upcoming-item">
    <div className="vd-upcoming-thumb-container">
      <img 
        src={video.thumbnail || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200"} 
        alt={video.title} 
        className="vd-upcoming-img"
      />
      {/* Overlay icon for a pro look */}
      <div className="vd-thumb-overlay">
        <img src={VideosIcon} alt="Play" className="vd-play-hint-icon" />
      </div>
    </div>
    <div className="vd-upcoming-info">
      <p className="vd-upcoming-title">{video.title}</p>
      <span className="vd-upcoming-status">Next Lesson</span>
    </div>
  </div>
);

export default VideoUpcomingCard;