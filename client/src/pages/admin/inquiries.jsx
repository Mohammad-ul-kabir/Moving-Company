import { useState } from "react";
import AdminShell from "../../components/admin/AdminShell";
import { saveInquiries } from "../../services/adminStore";

const STATUSES = ["NEW", "QUOTED", "BOOKED", "CLOSED"];

export default function Inquiries() {
  const [inquiries, setInquiries] = useState([]);

  const updateStatus = (id, status) => {
    const next = inquiries.map((i) => (i.id === id ? { ...i, status } : i));
    setInquiries(next);
    saveInquiries(next);
  };

  return (
    <AdminShell title="Inquiries">
      <div className="overflow-x-auto">
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
                  No inquiries yet. When you build the customer Inquiry form,
                  they will appear here.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
