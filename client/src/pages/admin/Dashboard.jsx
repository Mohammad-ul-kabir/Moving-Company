import { Link } from "react-router-dom";

function Stat({ label, value }) {
  return (
    <div className="bg-white border rounded-2xl p-5 shadow-sm">
      <div className="text-sm text-slate-600">{label}</div>
      <div className="text-2xl font-bold text-slate-900 mt-1">{value}</div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-1">Quick overview.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Stat label="Active Areas" value="—" />
        <Stat label="New Inquiries" value="—" />
        <Stat label="Bookings" value="—" />
      </div>

      <div className="bg-white border rounded-2xl p-6 shadow-sm">
        <div className="font-semibold text-slate-900">Quick Actions</div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            to="/admin/areas"
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
          >
            Manage Areas
          </Link>
          <Link
            to="/admin/inquiries"
            className="px-4 py-2 rounded-xl bg-slate-100 text-slate-900 font-semibold hover:bg-slate-200"
          >
            View Inquiries
          </Link>
        </div>
      </div>
    </div>
  );
}
