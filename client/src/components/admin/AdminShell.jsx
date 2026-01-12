import { NavLink, useNavigate } from "react-router-dom";
import { adminLogout } from "../../services/adminStore";

const linkClass = ({ isActive }) =>
  `block px-3 py-2 rounded-xl text-sm font-medium ${
    isActive ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-slate-100"
  }`;

export default function AdminShell({ title, children }) {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid lg:grid-cols-[240px_1fr] gap-6">
          <aside className="bg-white border rounded-2xl p-4 shadow-sm h-fit">
            <div className="font-semibold text-slate-900 mb-3">Admin</div>

            <nav className="space-y-1">
              <NavLink to="/admin/areas" className={linkClass}>
                Areas
              </NavLink>
              <NavLink to="/admin/inquiries" className={linkClass}>
                Inquiries
              </NavLink>
              <NavLink to="/admin/bookings" className={linkClass}>
                Bookings
              </NavLink>

              <a
                href="/"
                className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Back to site
              </a>
            </nav>

            <button
              onClick={() => {
                adminLogout();
                nav("/admin/login");
              }}
              className="mt-4 w-full px-3 py-2 rounded-xl border text-sm font-semibold hover:bg-slate-50"
            >
              Logout
            </button>
          </aside>

          <main className="bg-white border rounded-2xl shadow-sm">
            <div className="p-5 border-b">
              <h1 className="text-xl font-bold text-slate-900">{title}</h1>
            </div>
            <div className="p-5">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
