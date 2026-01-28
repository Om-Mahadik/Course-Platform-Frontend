import React from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <aside style={{ width: "220px", background: "#111", color: "#fff" }}>
        <h3 style={{ padding: "16px" }}>Admin Panel</h3>
        <ul>
          <li>Dashboard</li>
          <li>Courses</li>
          <li>Users</li>
        </ul>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1 }}>
        {/* Topbar */}
        <header style={{ height: "60px", borderBottom: "1px solid #ddd" }}>
          Admin Topbar
        </header>

        {/* Page Content */}
        <main style={{ padding: "20px" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
