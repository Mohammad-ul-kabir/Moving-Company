import { useEffect, useState } from "react";
import AdminShell from "../../components/admin/AdminShell";
import { getBookings, saveBookings } from "../../services/adminStore";

const STATUSES = ["CONFIRMED", "IN_PROGRESS", "COMPLETED", "CANCELLED"];

export default function Bookings() {
  const [bookings, setBookings] = useState(() => getBookings());

  useEffect(() => {
    const sync = () => setBookings(getBookings());
    window.addEventListener("focus", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("focus", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const updateStatus = (id, status) => {
    const next = bookings.map((b) => (b.id === id ? { ...b, status } : b));
    setBookings(next);
    saveBookings(next);
  };

  return (
    <AdminShell title="Bookings">
      <p className="text-sm text-slate-600">
        Total: <span className="font-semibold">{bookings.length}</span>
      </p>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-slate-600">
            <tr className="border-b">
              <th className="py-3">Customer</th>
              <th className="py-3">Route</th>
              <th className="py-3">Date</th>
              <th className="py-3">Time</th>
              <th className="py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b">
                <td className="py-3">
                  <div className="font-medium text-slate-900">{b.name}</div>
                  <div className="text-xs text-slate-600">{b.phone}</div>
                </td>
                <td className="py-3">
                  <div className="font-medium text-slate-900">
                    {b.pickup} → {b.delivery}
                  </div>
                  <div className="text-xs text-slate-600">{b.moveType}</div>
                </td>
                <td className="py-3">{b.moveDate}</td>
                <td className="py-3">{b.timeWindow}</td>
                <td className="py-3">
                  <select
                    value={b.status}
                    onChange={(e) => updateStatus(b.id, e.target.value)}
                    className="rounded-xl border px-3 py-2"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}

            {bookings.length === 0 && (
              <tr>
                <td className="py-6 text-slate-600" colSpan={5}>
                  No bookings yet. Create one from the customer Book page.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
