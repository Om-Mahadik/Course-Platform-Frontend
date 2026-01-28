import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { fetchVideosByModule } from "../../../services/videoService";
import VideoListItem from "./VideoListItem";
import "./VideoList.css";

import VideoIcon from "../../../icons/videos.svg"; 

const VideoList = ({ moduleId, courseSlug }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadVideos = async () => {
      if (!moduleId) return;
      try {
        setLoading(true);
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return;

        const token = await user.getIdToken();
        const data = await fetchVideosByModule(moduleId, token);
        const sortedVideos = data.sort((a, b) => a.order - b.order);
        setVideos(sortedVideos);
      } catch (err) {
        console.error("Failed to fetch videos:", err);
      } finally {
        setLoading(false);
      }
    };
    loadVideos();
  }, [moduleId]);

  if (!moduleId) return (
    <div className="cvl-container">
      <div className="cvl-placeholder">Select a module to view lessons.</div>
    </div>
  );

  if (loading) return (
    <div className="cvl-container">
      <div className="cvl-header-skeleton shimmer" />
      <div className="cvl-stack">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="cvl-item-skeleton shimmer" />
        ))}
      </div>
    </div>
  );

  // ... existing imports

return (
  <div className="cvl-container">
    {/* This part sticks */}
    <div className="cvl-header">
      <img src={VideoIcon} alt="Videos" className="cvl-header-icon" />
      <h3 className="cvl-header-title">Videos</h3>
    </div>

    {/* This part scrolls normally */}
    <div className="cvl-stack">
      {videos.map((video) => (
        <VideoListItem 
          key={video._id} 
          video={video} 
          onClick={() => navigate(`/users/courses/${courseSlug}/videos/${video._id}`)}
        />
      ))}
    </div>
  </div>
);
};

export default VideoList;