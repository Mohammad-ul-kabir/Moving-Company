import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { customerLogin } from "../services/customerAuthApi";

export default function CustomerLogin() {
  const nav = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/my-requests";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await customerLogin({ email, password });
      nav(from, { replace: true });
    } catch (e2) {
      setErr(e2?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="max-w-md mx-auto bg-white border rounded-2xl shadow-sm p-6">
          <h1 className="text-2xl font-bold text-slate-900">Customer Login</h1>
          <p className="text-slate-600 mt-2 text-sm">
            Sign in to view your bookings and inquiries.
          </p>

          {err && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm p-3">
              {err}
            </div>
          )}

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                autoComplete="username"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            <button
              disabled={loading}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-sm hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <div className="text-sm text-slate-600">
              No account?{" "}
              <Link
                to="/signup"
                className="text-blue-700 font-semibold hover:underline"
              >
                Create one
              </Link>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
