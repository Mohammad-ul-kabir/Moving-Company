import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { clearAdminAuth, getAdminAuth } from "../../services/authApi";

const linkClass = ({ isActive }) =>
  `px-3 py-2 rounded-xl text-sm font-semibold transition ${
    isActive ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-slate-100"
  }`;

export default function AdminLayout() {
  const nav = useNavigate();
  const auth = getAdminAuth();

  const logout = () => {
    clearAdminAuth();
    nav("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="font-bold text-slate-900">Admin Panel</div>
            <span className="text-sm text-slate-500 hidden sm:inline">
              {auth?.email}
            </span>
          </div>

          <button
            onClick={logout}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 grid lg:grid-cols-[240px_1fr] gap-6">
        <aside className="bg-white border rounded-2xl p-3 h-fit">
          <nav className="flex lg:flex-col gap-2">
            <NavLink to="/admin/dashboard" className={linkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/admin/areas" className={linkClass}>
              Service Areas
            </NavLink>
            <NavLink to="/admin/inquiries" className={linkClass}>
              Inquiries
            </NavLink>
          </nav>
        </aside>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
