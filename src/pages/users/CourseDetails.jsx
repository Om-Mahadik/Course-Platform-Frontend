import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import "./CourseDetails.css";

import CourseSidebar from "../../components/users/courses/CourseSidebar";
import CourseHeader from "../../components/users/courses/CourseHeader";
import VideoList from "../../components/users/courses/VideoList";
import { fetchCourseBySlug } from "../../services/courseService";

const CourseDetails = () => {
  const { slug } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ selected module
  const [selectedModuleId, setSelectedModuleId] = useState(null);

  // Persist selection to localStorage whenever it changes
  useEffect(() => {
    if (selectedModuleId) {
      localStorage.setItem(`selectedModule_${slug}`, selectedModuleId);
    }
  }, [selectedModuleId, slug]);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        console.warn("No user logged in");
        setCourse(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const token = await user.getIdToken();
        const data = await fetchCourseBySlug(slug, token);
        setCourse(data);

        // ✅ Check localStorage for previously selected module
        const savedModuleId = localStorage.getItem(`selectedModule_${slug}`);

        if (
          savedModuleId &&
          data.modules?.some((m) => String(m._id) === String(savedModuleId))
        ) {
          setSelectedModuleId(savedModuleId);
        } else if (data.modules && data.modules.length > 0) {
          // auto-select first module if none saved
          setSelectedModuleId(String(data.modules[0]._id));
        }
      } catch (err) {
        console.error("Failed to load course:", err);
        setCourse(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [slug]);

  if (loading)
    return (
      <div className="course-loading-wrapper">
        <div className="sidebar-skeleton">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="skeleton-module" />
          ))}
        </div>
        <div className="videos-skeleton">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="skeleton-video" />
          ))}
        </div>
      </div>
    );

  if (!course) return <p className="no-course-text">Course not found</p>;

  return (
    <div className="outlet-content-wrapper">
      <CourseHeader course={course} />

      <div className="course-content-grid">
        <CourseSidebar
  courseId={course._id}
  selectedModuleId={selectedModuleId}
  onModuleSelect={setSelectedModuleId}
  onModulesLoaded={(modules) => {
    const savedModuleId = localStorage.getItem(`selectedModule_${slug}`);

    if (
      savedModuleId &&
      modules?.some((m) => String(m._id) === String(savedModuleId))
    ) {
      setSelectedModuleId(savedModuleId);
    } else if (modules && modules.length > 0) {
      setSelectedModuleId(String(modules[0]._id));
    }
  }}
/>


        <VideoList moduleId={selectedModuleId} courseSlug={slug}/>
      </div>
    </div>
  );
};

export default CourseDetails;
