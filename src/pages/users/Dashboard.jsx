import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { Header } from "../../components/users/dashboard/Header";
import { DateSelector } from "../../components/users/dashboard/DateSelector";
import { LastActivity } from "../../components/users/dashboard/LastActivity";
import { CourseCard } from "../../components/users/dashboard/CourseCard";

import { getAllUserProgress } from "../../services/progressService";
import { fetchCourseById } from "../../services/courseService";

import CourseIcon from "../../icons/courses.svg";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("Student");

  // Last Activity
  const [loadingActivity, setLoadingActivity] = useState(true);
  const [lastActivity, setLastActivity] = useState(null);
  const [courseSlug, setCourseSlug] = useState(null);

  // Courses
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoadingActivity(false);
        setLoadingCourses(false);
        return;
      }

      setName(user.displayName || "Student");

      try {
        const token = await user.getIdToken();
        const allProgress = await getAllUserProgress(token);

        /* ---------- LAST ACTIVITY ---------- */
        if (allProgress?.length) {
          const latestProgress = allProgress.find(
            (p) => p.lastWatchedVideo
          );

          if (latestProgress) {
            setLastActivity(latestProgress.lastWatchedVideo);

            const course = await fetchCourseById(
              latestProgress.courseId,
              token
            );

            setCourseSlug(course.slug || course._id);
          }
        }

        /* ---------- COURSES LIST ---------- */
        const courseMap = new Map();

        for (const progress of allProgress) {
          if (courseMap.has(progress.courseId)) continue;

          const course = await fetchCourseById(
            progress.courseId,
            token
          );

          const daysLeft = course.expiresAt
            ? Math.max(
                0,
                Math.ceil(
                  (new Date(course.expiresAt) - Date.now()) /
                    (1000 * 60 * 60 * 24)
                )
              )
            : "--";

          courseMap.set(progress.courseId, {
            id: course._id,
            title: course.title,
            slug: course.slug || course._id,
            progress: Math.round(progress.progressPercentage || 0),
            daysLeft
          });
        }

        setCourses([...courseMap.values()]);
      } catch (error) {
        console.error("❌ Dashboard error:", error);
      } finally {
        setLoadingActivity(false);
        setLoadingCourses(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleContinue = () => {
    if (lastActivity && courseSlug) {
      navigate(
        `/users/courses/${courseSlug}/videos/${lastActivity._id}`
      );
    } else {
      navigate("/users/courses");
    }
  };

  return (
    <div className="dashboard-layout">
      <div className="dashboard-content-col">
        <div className="inner-scroll-area">
          <Header name={name} />

          <DateSelector />

          {/* -------- LAST ACTIVITY -------- */}
          <LastActivity
            loading={loadingActivity}
            lastActivity={lastActivity}
            onContinue={handleContinue}
          />

          {/* -------- COURSES SECTION -------- */}
          <div className="courses-container animate-reveal">
            <div className="section-header">
              <img src={CourseIcon} alt="" className="header-icon" />
              <h3 className="section-tittle">My Courses</h3>
            </div>

            {loadingCourses ? (
              <div className="course-card skeleton-loading">
                <div className="skeleton-line title-line" />
                <div className="skeleton-line progress-line" />
                <div className="skeleton-line footer-line" />
              </div>
            ) : courses.length === 0 ? (
              <div className="course-card empty-card">
                <p>You don't have any courses yet.</p>
                <button
                  className="support-button"
                  onClick={() =>
                    (window.location.href =
                      "mailto:support@example.com")
                  }
                >
                  Contact Support
                </button>
              </div>
            ) : (
              courses.map((course) => (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  progress={course.progress}
                  daysLeft={course.daysLeft}
                  onClick={() =>
                    navigate(`/users/courses/${course.slug}`)
                  }
                />
              ))
            )}
          </div>
        </div>
      </div>

      <div className="dashboard-visual-col" />
    </div>
  );
};

export default Dashboard;
