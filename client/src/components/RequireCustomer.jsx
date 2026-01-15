import { Navigate, useLocation } from "react-router-dom";
import { getCustomerAuth } from "../services/customerAuthApi";

export default function RequireCustomer({ children }) {
  const location = useLocation();
  const auth = getCustomerAuth();

  if (!auth?.token) {
    const from = location.pathname + (location.search || "");
    return <Navigate to="/login" state={{ from }} replace />;
  }

  return children;
}
