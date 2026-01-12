import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequireAdmin from "./components/admin/RequireAdmin";
import Areas from "./pages/admin/areas";
import Bookings from "./pages/admin/booking";
import Inquiries from "./pages/admin/inquiries";
import Login from "./pages/admin/login";
import Book from "./pages/Book";
import Home from "./pages/Home";
import Inquiry from "./pages/Inquiry";
import ServiceAreas from "./pages/ServiceAreas"; // if you already created it
import Success from "./pages/Success";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/service-areas" element={<ServiceAreas />} />
        <Route path="/inquiry" element={<Inquiry />} />
        <Route path="/success" element={<Success />} />

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
      </Routes>
    </BrowserRouter>
  );
}
