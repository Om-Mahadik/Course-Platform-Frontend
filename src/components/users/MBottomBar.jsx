import { NavLink } from "react-router-dom";
import "./MBottomBar.css";

// Import your SVGs from the icons folder
import dashboardIcon from "../../icons/dashboard.svg";
import coursesIcon from "../../icons/courses.svg";
import achievementsIcon from "../../icons/achievements.svg";
import updatesIcon from "../../icons/updates.svg";

const MBottomBar = () => {
  return (
    <div className="m-nav-wrapper">
      <nav className="m-nav-pill">
        <NavLink to="dashboard" className={({ isActive }) => isActive ? "m-nav-item active" : "m-nav-item"}>
          <img src={dashboardIcon} alt="Dashboard" className="m-nav-svg" />
        </NavLink>
        
        <NavLink to="courses" className={({ isActive }) => isActive ? "m-nav-item active" : "m-nav-item"}>
          <img src={coursesIcon} alt="Courses" className="m-nav-svg" />
        </NavLink>
        
        <NavLink to="achievements" className={({ isActive }) => isActive ? "m-nav-item active" : "m-nav-item"}>
          <img src={achievementsIcon} alt="Achievements" className="m-nav-svg" />
        </NavLink>
        
        <NavLink to="updates" className={({ isActive }) => isActive ? "m-nav-item active" : "m-nav-item"}>
          <img src={updatesIcon} alt="Updates" className="m-nav-svg" />
        </NavLink>
      </nav>
    </div>
  );
};

export default MBottomBar;