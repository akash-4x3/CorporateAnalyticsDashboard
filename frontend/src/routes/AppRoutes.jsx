import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import UsersPage from "../pages/users/UsersPage";
import DepartmentsPage from "../pages/departments/DepartmentsPage";
import RolesPage from "../pages/roles/RolesPage";
import PerformancePage from "../pages/performance/PerformancePage";
import ProtectedRoute from "./ProtectedRoute";
import { ROLES } from "../utils/authUtils";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LandingPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/users"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <UsersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/departments"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <DepartmentsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/roles"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <RolesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/performance"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]}>
            <PerformancePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
