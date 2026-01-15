import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { customerRegister } from "../services/customerAuthApi";

export default function CustomerSignup() {
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await customerRegister({ name, email, password });
      nav("/my-requests", { replace: true });
    } catch (e2) {
      setErr(e2?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="max-w-md mx-auto bg-white border rounded-2xl shadow-sm p-6">
          <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
          <p className="text-slate-600 mt-2 text-sm">
            Create an account to track your bookings and inquiries.
          </p>

          {err && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm p-3">
              {err}
            </div>
          )}

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700">Name</label>
              <input
                className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>

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
                placeholder="Min 6 characters"
                autoComplete="new-password"
              />
              <div className="text-xs text-slate-500 mt-1">
                Password must be at least 6 characters.
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-sm hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>

            <div className="text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-700 font-semibold hover:underline"
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
