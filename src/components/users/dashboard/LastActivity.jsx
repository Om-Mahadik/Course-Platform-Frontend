import React from "react";
import { useNavigate } from "react-router-dom";
import "./LastActivity.css";

import ActivityIcon from "../../../icons/activity.svg";
import PlayIcon from "../../../icons/videos.svg";
import TimeIcon from "../../../icons/time.svg";

export const LastActivity = ({ loading, lastActivity, onContinue }) => {
  return (
    <section className="activity-section animate-reveal">
      <div className="section-header">
        <img src={ActivityIcon} alt="" className="header-icon" />
        <h3 className="section-tittle">Last Activity</h3>
      </div>

      <div className={`activity-card ${loading ? "is-loading" : ""}`}>
        {loading ? (
          /* SKELETON LOADING */
          <div className="skeleton-wrapper">
            <div className="card-horizontal-content">
              <div className="thumb-container skeleton-shimmer" />
              <div className="info-container">
                <div
                  className="skeleton-text skeleton-shimmer"
                  style={{ width: "140px" }}
                />
                <div
                  className="skeleton-text skeleton-shimmer"
                  style={{ width: "80px", height: "20px" }}
                />
              </div>
            </div>
            <div className="skeleton-button skeleton-shimmer" />
          </div>
        ) : lastActivity ? (
          /* ACTIVE STATE */
          <>
            <div className="card-horizontal-content">
              <div className="thumb-container">
                <img
                  src={
                    lastActivity.thumbnail ||
                    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600"
                  }
                  alt="Course"
                  className="course-thumb"
                />
                <div className="thumb-overlay" />
              </div>

              <div className="info-container">
                <h4 className="course-title-text">
                  {lastActivity.title || "Untitled Video"}
                </h4>

                <div className="time-tag">
                  <img src={TimeIcon} alt="" className="tiny-icon-svg" />
                  <span>
                    {lastActivity.duration/60 || "Unknown duration"} mins
                  </span>
                </div>
              </div>
            </div>

            <button className="watch-button" onClick={onContinue}>
              <div className="button-content">
                <img src={PlayIcon} alt="" className="play-btn-icon" />
                <span>Continue Watching</span>
              </div>
            </button>
          </>
        ) : (
          /* EMPTY STATE */
          <div className="empty-state">
            <p className="empty-text">
              You haven't had any activity yet. Start watching videos!
            </p>
            <button className="watch-button" onClick={onContinue}>
              <div className="button-content">
                <span>Go to Courses</span>
              </div>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
