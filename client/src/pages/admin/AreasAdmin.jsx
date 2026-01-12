import { useState } from "react";
import {
  addArea,
  deleteArea,
  getAreas,
  updateArea,
} from "../../services/areasStore";

function StatusBadge({ active }) {
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold border ${
        active
          ? "bg-green-50 text-green-700 border-green-200"
          : "bg-amber-50 text-amber-700 border-amber-200"
      }`}
    >
      {active ? "Active" : "Inactive"}
    </span>
  );
}

export default function AreasAdmin() {
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    city: "",
    area: "",
    postcode: "",
    isActive: true,
  });

  const [areas, setAreas] = useState(() => getAreas());

  const reset = () => {
    setEditingId(null);
    setForm({ city: "", area: "", postcode: "", isActive: true });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      city: form.city.trim(),
      area: form.area.trim().toUpperCase(),
      postcode: form.postcode.trim().toUpperCase(),
      isActive: !!form.isActive,
    };

    if (!payload.city || !payload.area || !payload.postcode) return;

    if (editingId) {
      setAreas(updateArea(editingId, payload));
    } else {
      setAreas(addArea(payload));
    }
    reset();
  };

  const onEdit = (a) => {
    setEditingId(a.id);
    setForm({
      city: a.city,
      area: a.area,
      postcode: a.postcode,
      isActive: a.isActive,
    });
  };

  const onToggle = (a) => {
    setAreas(updateArea(a.id, { isActive: !a.isActive }));
  };

  const onRemove = (id) => {
    setAreas(deleteArea(id));
    if (editingId === id) reset();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Service Areas</h1>
        <p className="text-slate-600 mt-1">
          Add / edit / delete areas where customers can book.
        </p>
      </div>

      {/* Add / Edit */}
      <form
        onSubmit={onSubmit}
        className="bg-white border rounded-2xl p-6 shadow-sm"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="font-semibold text-slate-900">
            {editingId ? "Edit Area" : "Add New Area"}
          </div>

          {editingId && (
            <button
              type="button"
              onClick={reset}
              className="px-3 py-2 rounded-xl bg-slate-100 font-semibold hover:bg-slate-200"
            >
              Cancel
            </button>
          )}
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700">City</label>
            <input
              className="mt-1 w-full rounded-xl border px-3 py-2"
              value={form.city}
              onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
              placeholder="Derby"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Area</label>
            <input
              className="mt-1 w-full rounded-xl border px-3 py-2"
              value={form.area}
              onChange={(e) => setForm((p) => ({ ...p, area: e.target.value }))}
              placeholder="DE1"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Postcode
            </label>
            <input
              className="mt-1 w-full rounded-xl border px-3 py-2"
              value={form.postcode}
              onChange={(e) =>
                setForm((p) => ({ ...p, postcode: e.target.value }))
              }
              placeholder="DE1"
              required
            />
          </div>

          <div className="flex items-end justify-between gap-3 rounded-xl border p-3">
            <div className="text-sm font-medium text-slate-700">Active?</div>
            <button
              type="button"
              onClick={() => setForm((p) => ({ ...p, isActive: !p.isActive }))}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${
                form.isActive ? "bg-blue-600" : "bg-slate-300"
              }`}
              aria-label="Toggle active"
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                  form.isActive ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        <button className="mt-5 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700">
          {editingId ? "Save Changes" : "Add Area"}
        </button>
      </form>

      {/* List */}
      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b font-semibold text-slate-900">
          Areas ({areas.length})
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="text-left p-3">City</th>
                <th className="text-left p-3">Area</th>
                <th className="text-left p-3">Postcode</th>
                <th className="text-left p-3">Status</th>
                <th className="text-right p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {areas.map((a) => (
                <tr key={a.id} className="border-t">
                  <td className="p-3 font-medium text-slate-900">{a.city}</td>
                  <td className="p-3">{a.area}</td>
                  <td className="p-3">{a.postcode}</td>
                  <td className="p-3">
                    <StatusBadge active={a.isActive} />
                  </td>
                  <td className="p-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onToggle(a)}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 font-semibold hover:bg-slate-200"
                      >
                        Toggle
                      </button>
                      <button
                        onClick={() => onEdit(a)}
                        className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onRemove(a.id)}
                        className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 font-semibold hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {areas.length === 0 && (
                <tr>
                  <td className="p-4 text-slate-600" colSpan={5}>
                    No areas yet.
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
