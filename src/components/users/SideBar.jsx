import { NavLink } from "react-router-dom";
import "./SideBar.css";

// Imports
import logo from "../../imgs/logo.jpg";
import dashboardIcon from "../../icons/dashboard.svg";
import coursesIcon from "../../icons/courses.svg";
import achievementsIcon from "../../icons/achievements.svg";
import updatesIcon from "../../icons/updates.svg";
import settingsIcon from "../../icons/settings.svg";

const SideBar = () => {
  return (
    <aside className="sidebar-container">
      <div className="sidebar-top">
        <div className="logo-wrapper">
          <img src={logo} alt="Logo" className="sidebar-logo-img" />
        </div>

        <nav className="nav-menu">
          <NavLink to="dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <img src={dashboardIcon} alt="" className="sidebar-svg" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="courses" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <img src={coursesIcon} alt="" className="sidebar-svg" />
            <span>Courses</span>
          </NavLink>

          <NavLink to="achievements" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <img src={achievementsIcon} alt="" className="sidebar-svg" />
            <span>Achievements</span>
          </NavLink>

          <NavLink to="updates" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <img src={updatesIcon} alt="" className="sidebar-svg" />
            <span>Updates</span>
          </NavLink>
        </nav>
      </div>

      <div className="sidebar-bottom">
        <NavLink to="settings" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <img src={settingsIcon} alt="" className="sidebar-svg" />
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default SideBar;