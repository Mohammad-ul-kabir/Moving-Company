import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequireAdmin from "./components/admin/RequireAdmin";
import Home from "./pages/Home";
import ServiceAreas from "./pages/ServiceAreas"; // if you already created it
import Areas from "./pages/admin/Areas";
import Login from "./pages/admin/LOgin";
import Inquiries from "./pages/admin/inquiries";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer */}
        <Route path="/" element={<Home />} />
        <Route path="/service-areas" element={<ServiceAreas />} />
        <Route path="/services" element={<Services />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/account" element={<Account />} />

        {/* Uncomment when you create these pages */}
        {/* <Route path="/inquiry" element={<Inquiry />} />
        <Route path="/book" element={<Book />} />
        <Route path="/success" element={<Success />} /> */}

        {/* Admin */}
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
      </Routes>
    </BrowserRouter>
  );
}
