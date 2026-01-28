import { Route } from "react-router-dom";
import UserLayout from "../components/user/UserLayout";
import Dashboard from "../pages/user/Dashboard";
import Courses from "../pages/user/Courses";
import Profile from "../pages/user/Profile";
import AuthMiddleware from "../middleware/AuthMiddleware";

const UserRoutes = (
  <Route path="/user" element={<AuthMiddleware />}>
    <Route element={<UserLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="courses" element={<Courses />} />
      <Route path="profile" element={<Profile />} />
    </Route>
  </Route>
);

export default UserRoutes;
