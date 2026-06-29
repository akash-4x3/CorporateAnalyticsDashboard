import { Navigate } from "react-router-dom";
import { getToken, hasAnyRole } from "../utils/authUtils";

function ProtectedRoute({ children, allowedRoles }) {

  const token = getToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !hasAnyRole(allowedRoles)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;
