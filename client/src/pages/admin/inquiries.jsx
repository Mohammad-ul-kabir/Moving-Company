import { useEffect, useState } from "react";
import AdminShell from "../../components/admin/AdminShell";
import { getInquiries, saveInquiries } from "../../services/adminStore";

const STATUSES = ["NEW", "QUOTED", "BOOKED", "CLOSED"];

export default function Inquiries() {
  // Read once on mount
  const [inquiries, setInquiries] = useState(() => getInquiries());

  // Subscribe to external changes (localStorage / tab focus)
  useEffect(() => {
    const sync = () => setInquiries(getInquiries());

    // When you return to the tab, pull latest localStorage
    window.addEventListener("focus", sync);

    // When localStorage changes (works across tabs)
    window.addEventListener("storage", sync);

    // When visibility changes (optional extra)
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") sync();
    });

    return () => {
      window.removeEventListener("focus", sync);
      window.removeEventListener("storage", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  const updateStatus = (id, status) => {
    const next = inquiries.map((i) => (i.id === id ? { ...i, status } : i));
    setInquiries(next);
    saveInquiries(next);
  };

  return (
    <AdminShell title="Inquiries">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-slate-600">
          Total: <span className="font-semibold">{inquiries.length}</span>
        </p>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-slate-600">
            <tr className="border-b">
              <th className="py-3">Customer</th>
              <th className="py-3 ddd">Route</th>
              <th className="py-3">Move Date</th>
              <th className="py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {inquiries.map((i) => (
              <tr key={i.id} className="border-b">
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
                    value={i.status}
                    onChange={(e) => updateStatus(i.id, e.target.value)}
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
    </AdminShell>
  );
}
