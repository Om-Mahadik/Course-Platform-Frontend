import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import MTopBar from "./MTopBar"; 
import MBottomBar from "./MBottomBar"; 
import "./UserLayout.css";

const UserLayout = () => {
  return (
    <div className="layout-wrapper">
      {/* Desktop Sidebar */}
      <div className="desktop-only">
        <SideBar />
      </div>

      <div className="main-stage">
        {/* MOBILE TOP BAR: Outside the white card to stay on black bg */}
        <div className="mobile-only">
          <MTopBar />
        </div>

        <div className="white-inner-card">
          {/* DESKTOP TOP BAR: Inside the white card */}
          <div className="desktop-only">
            <TopBar />
          </div>
          
          <main className="content-area">
            <Outlet />
          </main>
        </div>

        {/* MOBILE BOTTOM BAR: Floating logic handled in its own CSS */}
        <div className="mobile-only">
          <MBottomBar />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;