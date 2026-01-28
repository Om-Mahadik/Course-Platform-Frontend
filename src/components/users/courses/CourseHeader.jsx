import React, { useState, useEffect } from 'react';
import './CourseHeader.css';

import ModuleIcon from "../../../icons/modules.svg"; 
import VideoIcon from "../../../icons/videos.svg";
import CourseIcon from "../../../icons/courses-drawer.svg";

const CourseHeader = ({ course }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Compresses fully after 100px of scroll
      const currentScroll = Math.min(window.scrollY / 100, 1);
      setScrollProgress(currentScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const title = course?.title || "Full Stack Web Development";
  const modulesCount = course?.totalModules || 8;
  const videosCount = course?.totalVideos || 32;
  const creator = course?.creator || "Sahil Tekawade";

  return (
    <div 
      className={`ch-mobile-wrapper ${scrollProgress > 0.1 ? 'is-shrinking' : ''}`}
      style={{ '--shrink-val': scrollProgress }}
    >
      <div className="ch-mob-top-row">
        <div className="ch-mob-header-stack">
          {/* Label and Title now sit in a flex row that aligns when shrinking */}
          <div className="ch-header-combined">
            <div className="ch-label">
              <img src={CourseIcon} alt="" className="ch-label-icon" />
              <span className="ch-label-text fade-out">Course</span>
            </div>
            <h1 className="ch-mob-title">{title}</h1>
          </div>
        </div>
        <button className="ch-info-pill fade-out">ⓘ Info</button>
      </div>

      <div className="ch-mob-creator fade-out">Creator: {creator}</div>

      <div className="ch-stats-row">
        <div className="ch-stat-pill">
          <span>Modules: {modulesCount}</span>
        </div>
        <div className="ch-stat-pill">
          <span>Videos: {videosCount}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;