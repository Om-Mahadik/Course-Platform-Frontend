import React from "react";
import "./VideoListItem.css";
import TimeIcon from "../../../icons/time.svg";

const VideoListItem = ({ video, onClick }) => {
  return (
    <div className="vli-card" onClick={onClick}>
      <div className="vli-thumb">
        <img 
          src={video.thumbnail || "https://placehold.net/product.svg"} 
          alt={video.title} 
        />
      </div>

      <div className="vli-content">
        <div className="vli-text">
          <h4 className="vli-title">{video.title}</h4>
          <p className="vli-desc">{video.description}</p>
        </div>
        
        <div className="vli-footer">
          <div className="vli-time-pill">
            <img src={TimeIcon} alt="duration" className="vli-time-icon" />
            <span>{video.duration || "5"} mins</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoListItem;