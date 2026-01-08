import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Success() {
  const { state } = useLocation();
  const type = state?.type ?? "request";

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="max-w-xl bg-white border rounded-2xl shadow-sm p-8">
          <h1 className="text-2xl font-bold text-slate-900">Success 🎉</h1>
          <p className="text-slate-600 mt-2">
            Your {type} has been submitted. We’ll contact you soon.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/"
              className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
            >
              Back to Home
            </Link>
            <Link
              to="/service-areas"
              className="px-4 py-2 rounded-xl bg-slate-100 text-slate-900 font-semibold hover:bg-slate-200"
            >
              Check Service Areas
            </Link>
            <Link
              to="/admin/inquiries"
              className="px-4 py-2 rounded-xl border font-semibold hover:bg-slate-50"
            >
              Admin: View Inquiries
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
