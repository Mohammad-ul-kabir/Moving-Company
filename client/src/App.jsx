import { BrowserRouter, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import RequireCustomer from "./components/RequireCustomer";

import Account from "./pages/Account";
import Book from "./pages/Book";
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import Inquiry from "./pages/Inquiry";
import ServiceAreas from "./pages/ServiceAreas";
import Success from "./pages/Success";

import CustomerLogin from "./pages/CustomerLogin";
import CustomerSignup from "./pages/CustomerSignup";
import MyRequests from "./pages/MyRequests";
import AdminLayout from "./pages/admin/AdminLayout";
import Areas from "./pages/admin/AreasList";
import Bookings from "./pages/admin/Bookings";
import Dashboard from "./pages/admin/Dashboard";
import Inquiries from "./pages/admin/InquiriesLis";

import Login from "./pages/admin/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/service-areas" element={<ServiceAreas />} />
        <Route path="/inquiry" element={<Inquiry />} />
        <Route path="/book" element={<Book />} />
        <Route path="/success" element={<Success />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/account" element={<Account />} />

        {/* Customer auth */}
        <Route path="/login" element={<CustomerLogin />} />
        <Route path="/signup" element={<CustomerSignup />} />
        <Route
          path="/my-requests"
          element={
            <RequireCustomer>
              <MyRequests />
            </RequireCustomer>
          }
        />

        {/* Admin login (public) */}
        <Route path="/admin/login" element={<Login />} />

        {/* Admin (protected + nested layout) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="areas" element={<Areas />} />
          <Route path="inquiries" element={<Inquiries />} />
          <Route path="bookings" element={<Bookings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
