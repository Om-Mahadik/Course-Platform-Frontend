import React, { useState, useEffect, useRef } from "react";
import "./VideoPlayerSection.css";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import { toggleVideoCompletion, getUserProgress } from "../../../services/progressService";
import { getCourseIdFromVideo } from "../../../services/videoService";
import { getAuth } from "firebase/auth";

const VideoPlayerSection = ({ title, duration, description, thumbnail, videoUrl, videoId, onNext }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [courseId, setCourseId] = useState(null);
  const [token, setToken] = useState(null);

  const videoRef = useRef(null);
  const playerRef = useRef(null);

  // Format seconds to MM:SS
  const formatDuration = (seconds) => {
    if (!seconds) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")} min`;
  };

  useEffect(() => {
    const fetchToken = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;
      const idToken = await user.getIdToken();
      setToken(idToken);
    };
    fetchToken();
  }, []);

  useEffect(() => {
    const fetchCourseId = async () => {
      if (!videoId || !token) return;
      try {
        const id = await getCourseIdFromVideo(videoId, token);
        setCourseId(id);
      } catch (err) { console.error(err); }
    };
    fetchCourseId();
  }, [videoId, token]);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!courseId || !token) return;
      try {
        const progress = await getUserProgress(courseId, token);
        const isCompleted = progress.completedVideos?.some((v) => String(v._id) === String(videoId));
        setCompleted(isCompleted);
      } catch (err) { console.error(err); }
    };
    fetchProgress();
  }, [courseId, videoId, token]);

  useEffect(() => {
    if (isPlaying && videoRef.current && !playerRef.current) {
      playerRef.current = new Plyr(videoRef.current, {
        controls: ["play", "progress", "current-time", "mute", "volume", "fullscreen"],
      });
    }
    return () => { if (playerRef.current) playerRef.current.destroy(); };
  }, [isPlaying]);

  const handleToggleComplete = async () => {
    if (!courseId || !token) return;
    try {
      setLoading(true);
      const data = await toggleVideoCompletion(courseId, videoId, token);
      setCompleted(data.completed);
    } catch (err) {
      console.error("Toggle failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="vd-container">
      <div className="vd-video-card">
        {!isPlaying ? (
          <div className="vd-poster" onClick={() => { setIsPlaying(true); setIsVideoLoading(true); }}>
            <img src={thumbnail} alt="" className="vd-img" />
            <div className="vd-overlay">
              <div className="vd-play-btn-circle"><span className="vd-play-glyph">▶</span></div>
            </div>
          </div>
        ) : (
          <div className="vd-player-host">
            {isVideoLoading && (
              <div className="vd-video-skeleton">
                <div className="vd-loader-ring"></div>
              </div>
            )}
            <video
              ref={videoRef}
              className={`vd-video-element ${isVideoLoading ? "is-hidden" : "is-visible"}`}
              src={videoUrl}
              onCanPlay={() => setIsVideoLoading(false)}
              autoPlay
            />
          </div>
        )}
      </div>

      <div className="vd-content-header">
        <div className="vd-title-block">
          <div className="vd-meta-row">
            <span className="vd-badge">Lesson Content</span>
            <span className="vd-duration-tag">{formatDuration(duration)}</span>
          </div>
          <h1 className="vd-main-title">{title}</h1>
          <p className="vd-main-desc">{description}</p>
        </div>
      </div>

      <div className="vd-actions-bar">
        <div className="vd-btn-group">
          <div className="vd-tooltip-wrapper">
            <button
              className={`vd-action-button ${completed ? "is-completed" : "is-pending"}`}
              onClick={handleToggleComplete}
              disabled={loading}
            >
              {loading ? (
                <div className="vd-small-spinner"></div>
              ) : completed ? (
                <><span className="vd-icon-check">✓</span> Completed</>
              ) : (
                "Mark as Complete"
              )}
            </button>
            {completed && <span className="vd-tooltip-hint">Click again to undo</span>}
          </div>

          <button className="vd-next-button" onClick={onNext}>
            Next Video <span className="vd-arrow-right">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default VideoPlayerSection;