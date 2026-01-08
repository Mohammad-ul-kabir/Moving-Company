import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequireAdmin from "./components/admin/RequireAdmin";
import Home from "./pages/Home";
import Inquiry from "./pages/Inquiry";
import ServiceAreas from "./pages/ServiceAreas"; // if you already created it
import Success from "./pages/Success";
import Areas from "./pages/admin/areas";
import Inquiries from "./pages/admin/inquiries";
import Login from "./pages/admin/login";

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
      </Routes>
    </BrowserRouter>
  );
}
