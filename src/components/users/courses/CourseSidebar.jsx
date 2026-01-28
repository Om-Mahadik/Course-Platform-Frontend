import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { fetchModulesByCourse } from "../../../services/moduleService";
import "./CourseSidebar.css";

import ModuleIcon from "../../../icons/modules.svg"; 
import ArrowIcon from "../../../icons/dropdown-arrow.svg"; // New SVG Import

const CourseSidebar = ({ courseId, selectedModuleId, onModuleSelect, onModulesLoaded }) => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    
    const loadModules = async () => {
      if (!courseId) return;
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return;
        const token = await user.getIdToken();
        const data = await fetchModulesByCourse(courseId, token);
        setModules(data);
        if (onModulesLoaded) onModulesLoaded(data);
      } catch (err) {
        console.error("Failed to fetch modules:", err);
      } finally {
        setLoading(false);
      }
    };

    loadModules();
    return () => window.removeEventListener('resize', handleResize);
  }, [courseId, onModulesLoaded]);

  if (loading) return <div className="c-sidebar-loading">Loading Modules...</div>;

  // Find the active module and its index
  const activeIndex = modules.findIndex(m => String(m._id) === String(selectedModuleId));
  const selectedModule = modules[activeIndex];

  if (isMobile) {
    return (
      <div className="c-mob-dropdown-container">
        <div className="c-mob-header-row">
          <div className="c-mob-header-left">
            <img src={ModuleIcon} alt="" className="c-header-icon" />
            <span className="c-header-title">Modules</span>
          </div>
          <div className="c-mob-progress">
             <span className="c-progress-current">{activeIndex + 1}</span> / {modules.length}
          </div>
        </div>

        {/* The Selected Module Pill */}
        <div 
          className={`c-mob-select-pill ${isOpen ? 'is-open' : ''}`} 
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="c-mob-selected-content">
            {selectedModule ? (
              <>
                <div className="c-index-badge active-pill-badge">{activeIndex + 1}</div>
                <span className="c-sidebar-label active-pill-label">{selectedModule.title}</span>
              </>
            ) : (
              <span className="c-sidebar-label">Select Module</span>
            )}
          </div>
          <img 
            src={ArrowIcon} 
            alt="arrow" 
            className={`c-dropdown-arrow-svg ${isOpen ? 'up' : ''}`} 
          />
        </div>

        <div className={`c-mob-dropdown-list ${isOpen ? 'show' : ''}`}>
          {modules.map((mod, index) => (
            <div
              key={mod._id}
              className={`c-sidebar-item ${String(selectedModuleId) === String(mod._id) ? "is-active" : ""}`}
              onClick={() => {
                onModuleSelect(String(mod._id));
                setIsOpen(false);
              }}
            >
              <div className="c-index-badge">{index + 1}</div>
              <span className="c-sidebar-label">{mod.title}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- DESKTOP REMAINS UNCHANGED ---
  return (
    <div className="c-sidebar-container">
      <div className="c-sidebar-header">
        <div className="c-header-icon-wrapper">
          <img src={ModuleIcon} alt="Modules" className="c-header-icon" />
        </div>
        <h3 className="c-header-title">Modules</h3>
      </div>
      <div className="c-sidebar-list">
        {modules.map((mod, index) => (
          <div
            key={mod._id}
            className={`c-sidebar-item ${String(selectedModuleId) === String(mod._id) ? "is-active" : ""}`}
            onClick={() => onModuleSelect(String(mod._id))}
          >
            <div className="c-index-badge">{index + 1}</div>
            <span className="c-sidebar-label">{mod.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseSidebar;