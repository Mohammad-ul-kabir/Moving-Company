import { Navigate, useLocation } from "react-router-dom";
import { getAdminAuth } from "../services/authApi";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const auth = getAdminAuth();

  if (!auth?.token) {
    return (
      <Navigate to="/admin/login" state={{ from: location.pathname }} replace />
    );
  }

  return children;
}
