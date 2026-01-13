import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const STATUSES = ["NEW", "QUOTED", "BOOKED", "CLOSED"];

export default function InquiriesAdmin() {
  const [items, setItems] = useState([]);
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
      console.log("Fetched inquiries:", data);

      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.items)
        ? data.items
        : Array.isArray(data?.inquiries)
        ? data.inquiries
        : [];

      setItems(list);
    } catch (e) {
      console.error(e);
      setError(e.message || "Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const setStatus = async (id, status) => {
    await fetch(`${API}/api/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Inquiries</h1>
          <p className="text-slate-600 mt-1">
            UI items: <span className="font-semibold">{items.length}</span>
            <p className="text-xs text-slate-500">API: {API}</p>
            <h1>hello</h1>
          </p>
        </div>

        <button
          onClick={load}
          className="px-4 py-2 rounded-xl bg-slate-100 font-semibold hover:bg-slate-200"
        >
          Reload
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Debug preview (remove later) */}
      <div className="bg-white border rounded-2xl p-4 shadow-sm text-xs overflow-auto">
        <div className="font-semibold text-slate-900 mb-2">
          Debug (first item)
        </div>
        <pre>{JSON.stringify(items[0] || null, null, 2)}</pre>
      </div>

      {loading ? (
        <div className="text-slate-600">Loading…</div>
      ) : (
        <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
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
                      No inquiries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
