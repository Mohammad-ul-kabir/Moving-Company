import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin, seedAdminData } from "../../services/adminStore";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("admin@movingco.com");
  const [password, setPassword] = useState("admin123");
  const [err, setErr] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setErr("");

    if (!email.trim() || !password.trim()) {
      setErr("Email and password are required.");
      return;
    }

    seedAdminData(); // seed mock data once
    adminLogin(email.trim()); // mock login
    nav("/admin/areas");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md bg-white border rounded-2xl shadow-sm p-6"
      >
        <h1 className="text-2xl font-bold text-slate-900">Admin Login</h1>
        <p className="text-slate-600 mt-2 text-sm">
          Mock login for now. Backend auth comes later.
        </p>

        {err && (
          <div className="mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl p-3">
            {err}
          </div>
        )}

        <div className="mt-5 space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input
              className="mt-1 w-full rounded-xl border px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              className="mt-1 w-full rounded-xl border px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
          </div>

          <button className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
