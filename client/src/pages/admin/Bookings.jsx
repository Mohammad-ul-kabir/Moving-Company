import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminShell from "../../components/admin/AdminShell";
import { clearAdminAuth } from "../../services/authApi";
import { listBookings, updateBookingStatus } from "../../services/bookingsApi";

const STATUSES = ["NEW", "CONFIRMED", "COMPLETED", "CANCELLED"];

export default function Bookings() {
  const nav = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleAuthError = (e) => {
    const msg = String(e?.message || "");
    if (msg.includes("HTTP 401")) {
      clearAdminAuth(); // remove bad/expired token
      nav("/admin/login", {
        replace: true,
        state: { from: "/admin/bookings" },
      });
      return true;
    }
    return false;
  };

  const load = async () => {
    try {
      setError("");
      setLoading(true);
      const data = await listBookings();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      if (handleAuthError(e)) return;
      setError(e?.message || "Failed to load bookings");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setStatus = async (id, status) => {
    try {
      await updateBookingStatus(id, status);
      await load();
    } catch (e) {
      if (handleAuthError(e)) return;
      setError(e?.message || "Failed to update booking");
    }
  };

  return (
    <AdminShell title="Bookings">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-slate-600">
          Total: <span className="font-semibold">{items.length}</span>
        </p>
        <button
          onClick={load}
          className="px-4 py-2 rounded-xl bg-slate-100 font-semibold hover:bg-slate-200"
        >
          Reload
        </button>
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="mt-4 text-slate-600">Loading…</div>
      ) : (
        <div className="mt-4 bg-white border rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">Phone</th>
                  <th className="text-left p-3">Pickup → Delivery</th>
                  <th className="text-left p-3">Move Date</th>
                  <th className="text-left p-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {items.map((x) => (
                  <tr key={x._id} className="border-t">
                    <td className="p-3 font-medium text-slate-900">{x.name}</td>
                    <td className="p-3">{x.phone}</td>
                    <td className="p-3">
                      {x.pickup} → {x.delivery}
                    </td>
                    <td className="p-3">{x.moveDate || "-"}</td>
                    <td className="p-3">
                      <select
                        value={x.status || "NEW"}
                        onChange={(e) => setStatus(x._id, e.target.value)}
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

                {items.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-4 text-slate-600">
                      No bookings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
