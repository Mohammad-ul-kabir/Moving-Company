import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequireAdmin from "./components/admin/RequireAdmin";
import Account from "./pages/Account";
import Areas from "./pages/admin/areas";
import Bookings from "./pages/admin/booking";
import Inquiries from "./pages/admin/inquiries";
import Login from "./pages/admin/login";
import Book from "./pages/Book";
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import Inquiry from "./pages/Inquiry";
import ServiceAreas from "./pages/ServiceAreas"; // if you already created it
import Success from "./pages/Success";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import AreasAdmin from "./pages/admin/AreasAdmin";
import Dashboard from "./pages/admin/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/service-areas" element={<ServiceAreas />} />
        <Route path="/inquiry" element={<Inquiry />} />
        <Route path="/success" element={<Success />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/account" element={<Account />} />

        <Route path="/admin/login" element={<Login />} />

        <Route
          path="/admin/areas"
          element={
            <RequireAdmin>
              <Areas />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/inquiries"
          element={
            <RequireAdmin>
              <Inquiries />
            </RequireAdmin>
          }
        />
        <Route path="/book" element={<Book />} />

        <Route
          path="/admin/bookings"
          element={
            <RequireAdmin>
              <Bookings />
            </RequireAdmin>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="areas" element={<AreasAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
