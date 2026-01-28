import React from "react";
import "./CourseCard.css";
import ArrowIcon from "../../../icons/courses-drawer.svg";

export const CourseCard = ({ title, progress, daysLeft, onClick }) => {
  return (
    <div className="course-card" onClick={onClick}>
      <div className="card-top">
        <span className="course-title-label">
          <img src={ArrowIcon} alt="" className="title-icon" />
          {title}
        </span>
        <span className="arrow-link">➔</span>
      </div>

      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="card-footer">
        <span>
          Days Left: <strong>{daysLeft}</strong>
        </span>
        <span className="progress-percentage">
          {progress}%
        </span>
      </div>
    </div>
  );
};
