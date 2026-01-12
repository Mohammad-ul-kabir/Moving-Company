import { useState } from "react";
import { getInquiries, updateInquiry } from "../../services/inquiriesStore";

const STATUSES = ["NEW", "QUOTED", "BOOKED", "CLOSED"];

export default function InquiriesAdmin() {
  const [items, setItems] = useState(() => getInquiries());

  const reload = () => setItems(getInquiries());

  const setStatus = (id, status) => {
    setItems(updateInquiry(id, { status }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Inquiries</h1>
          <p className="text-slate-600 mt-1">Customer inquiries list.</p>
        </div>

        <button
          onClick={reload}
          className="px-4 py-2 rounded-xl bg-slate-100 font-semibold hover:bg-slate-200"
        >
          Reload
        </button>
      </div>

      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b font-semibold text-slate-900">
          Total ({items.length})
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Phone</th>
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Pickup → Delivery</th>
                <th className="text-left p-3">Move Date</th>
                <th className="text-left p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {items.map((x) => (
                <tr key={x.id} className="border-t">
                  <td className="p-3 font-medium text-slate-900">{x.name}</td>
                  <td className="p-3">{x.phone}</td>
                  <td className="p-3">{x.email || "-"}</td>
                  <td className="p-3">
                    {x.pickup} → {x.delivery}
                  </td>
                  <td className="p-3">{x.moveDate || "-"}</td>
                  <td className="p-3">
                    <select
                      value={x.status || "NEW"}
                      onChange={(e) => setStatus(x.id, e.target.value)}
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
                  <td colSpan={6} className="p-4 text-slate-600">
                    No inquiries yet. Submit one from the Inquiry page.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
