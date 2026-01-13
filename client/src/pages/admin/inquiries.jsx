import { useEffect, useState } from "react";
import AdminShell from "../../components/admin/AdminShell";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const STATUSES = ["NEW", "QUOTED", "BOOKED", "CLOSED"];

export default function Inquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setError("");
      setLoading(true);

      const res = await fetch(`${API}/api/inquiries?t=${Date.now()}`, {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`HTTP ${res.status}: ${txt}`);
      }

      const data = await res.json();
      const list = Array.isArray(data) ? data : [];
      setInquiries(list);
    } catch (e) {
      setError(e.message || "Failed to load inquiries");
      setInquiries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`${API}/api/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await load();
  };

  return (
    <AdminShell title="Inquiries">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-slate-600">
          Total: <span className="font-semibold">{inquiries.length}</span>
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
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-slate-600">
              <tr className="border-b">
                <th className="py-3">Customer</th>
                <th className="py-3">Route</th>
                <th className="py-3">Move Date</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {inquiries.map((i) => (
                <tr key={i._id} className="border-b">
                  <td className="py-3">
                    <div className="font-medium text-slate-900">{i.name}</div>
                    <div className="text-slate-600 text-xs">{i.phone}</div>
                  </td>

                  <td className="py-3">
                    <div className="text-slate-900 font-medium">
                      {i.pickup} → {i.delivery}
                    </div>
                  </td>

                  <td className="py-3">{i.moveDate || "—"}</td>

                  <td className="py-3">
                    <select
                      value={i.status || "NEW"}
                      onChange={(e) => updateStatus(i._id, e.target.value)}
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

              {inquiries.length === 0 && (
                <tr>
                  <td className="py-6 text-slate-600" colSpan={4}>
                    No inquiries yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}
