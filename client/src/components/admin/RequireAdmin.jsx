import { Navigate } from "react-router-dom";
import { isAdminAuthed } from "../../services/adminStore";

export default function RequireAdmin({ children }) {
  if (!isAdminAuthed()) return <Navigate to="/admin/login" replace />;
  return children;
}
