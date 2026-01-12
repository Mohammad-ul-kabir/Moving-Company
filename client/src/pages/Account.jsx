import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Account() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    // MOCK login for frontend-only phase (replace with real backend later)
    const token = crypto.randomUUID();
    localStorage.setItem(
      "auth",
      JSON.stringify({ token, email, loggedInAt: Date.now() })
    );

    setTimeout(() => {
      setSaving(false);
      alert("Logged in (mock). Next: connect backend + protect admin routes.");
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="max-w-md mx-auto bg-white border rounded-2xl shadow-sm p-6">
          <h1 className="text-2xl font-bold text-slate-900">My Account</h1>
          <p className="text-slate-600 mt-2 text-sm">
            Sign in to manage your requests (optional feature).
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              disabled={saving}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-sm hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? "Signing in..." : "Sign In"}
            </button>

            <div className="text-xs text-slate-500">
              Later we’ll connect this to your backend (JWT + admin/customer
              roles).
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
