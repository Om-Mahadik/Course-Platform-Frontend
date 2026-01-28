import React, { useState, useEffect } from "react";
import FilterTabs from "../../components/users/courses/FilterTabs";
import CourseCard from "../../components/users/courses/CourseCard";
import { fetchAllCourses } from "../../services/courseService";
import { getAuth } from "firebase/auth";
import "./Courses.css";

// Import your new icon
import coursesDrawerIcon from "../../icons/courses-drawer.svg";

const Courses = () => {
  const [activeTab, setActiveTab] = useState("In-Progress");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setCourses([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const token = await user.getIdToken();
        const data = await fetchAllCourses(token);
        setCourses(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="courses-page-container">
      {/* Updated Header with SVG */}
      <div className="courses-header-row">
        <img src={coursesDrawerIcon} alt="" className="header-svg-icon" />
        <span className="header-label">Courses</span>
      </div>

      <FilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {loading ? (
        <div className="courses-loading">
          {[1, 2, 3].map((i) => (
            <div key={i} className="course-skeleton">
              <div className="skeleton-thumbnail" />
              <div className="skeleton-info">
                <div className="skeleton-title" />
                <div className="skeleton-text" />
              </div>
            </div>
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="no-courses-wrapper">
          <p className="no-courses-text">No courses available at the moment.</p>
          <p className="coming-soon-text">New courses are coming soon! 🚀</p>
        </div>
      ) : (
        <div className="course-cards-stack">
          {courses.map((course) => (
            <CourseCard
              key={course._id}
              course={{
                id: course._id,
                title: course.title || "Untitled",
                creator: course.creator || "Unknown",
                modules: course.totalModules || 0,
                videos: course.totalVideos || 0,
                progress: course.progress || 0,
                image: course.thumbnail || "https://via.placeholder.com/400x220",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;