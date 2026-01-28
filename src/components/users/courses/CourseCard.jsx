import React from 'react';
import './CourseCard.css';
import { useNavigate } from 'react-router-dom';

// Icons from src.icons
import modulesIcon from '../../../icons/modules.svg';
import videosIcon from '../../../icons/videos.svg';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const urlName = course.title.toLowerCase().replace(/\s+/g, '-');
    navigate(`/users/courses/${urlName}`);
  };

  return (
    <div className="soft-pro-card" onClick={handleClick}>
      <div className="soft-image-container">
        <img src={course.image} alt={course.title} className="soft-img" />
      </div>
      
      <div className="soft-info-container">
        <div className="soft-text-header">
          <h3 className="soft-title">{course.title}</h3>
          <p className="soft-creator">Creator: {course.creator}</p>
        </div>
        
        <div className="soft-badge-row">
          <div className="soft-pill-blue">
            <img src={modulesIcon} alt="" />
            <span>Modules: {course.modules}</span>
          </div>
          <div className="soft-pill-blue">
            <img src={videosIcon} alt="" />
            <span>Videos: {course.videos}</span>
          </div>
        </div>

        <div className="soft-progress-group">
          <div className="soft-progress-labels">
            <span>Progress</span>
            <span className="compact-perc">{course.progress}%</span>
          </div>
          <div className="soft-bar-bg">
            <div 
              className="soft-bar-fill" 
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;