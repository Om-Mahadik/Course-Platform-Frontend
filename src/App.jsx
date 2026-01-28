import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "./pages/universal/Login";
import DashboardAdmin from "./pages/admin/Dashboard";
import DashboardUsers from "./pages/users/Dashboard";
import Courses from "./pages/users/Courses";
import CourseDetails from "./pages/users/CourseDetails";
import VideoDetails from "./pages/users/VideoDetails";

// Layouts
import UserLayout from "./components/users/UserLayout";

function App() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setAuthChecked(true);
  }, []);

  if (!authChecked) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* LOGIN */}
      <Route
        path="/login"
        element={
          !user ? (
            <Login setUser={setUser} />
          ) : (
            <Navigate
              to={user.role === "admin" ? "/admin/dashboard" : "/users/dashboard"}
            />
          )
        }
      />

      {/* ADMIN */}
      <Route
        path="/admin/dashboard"
        element={
          user && user.role === "admin"
            ? <DashboardAdmin user={user} />
            : <Navigate to="/login" />
        }
      />

      {/* USER */}
      <Route
        path="/users"
        element={user && user.role === "user" ? <UserLayout /> : <Navigate to="/login" />}
      >
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<DashboardUsers user={user} />} />
        <Route path="courses" element={<Courses />} />
        <Route path="courses/:slug" element={<CourseDetails />} />

        {/* Video Details */}
        <Route path="courses/:courseSlug/videos/:videoId" element={<VideoDetails />} />
      </Route>

      {/* FALLBACK */}
      <Route
        path="*"
        element={
          <Navigate
            to={
              user
                ? user.role === "admin"
                  ? "/admin/dashboard"
                  : "/users/dashboard"
                : "/login"
            }
          />
        }
      />
    </Routes>
  );
}

export default App;
