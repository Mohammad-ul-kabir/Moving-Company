import { Navigate, useLocation } from "react-router-dom";
import { getAdminAuth } from "../services/authApi";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const auth = getAdminAuth();

  if (!auth?.token) {
    const from = location.pathname + (location.search || "");
    return <Navigate to="/admin/login" state={{ from }} replace />;
  }

  return children;
}
