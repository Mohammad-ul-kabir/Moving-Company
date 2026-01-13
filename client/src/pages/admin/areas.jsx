import { useEffect, useMemo, useState } from "react";
import AdminShell from "../../components/admin/AdminShell";
import {
  createArea,
  fetchAllAreas,
  removeArea,
  updateArea,
} from "../../services/areasApi";

export default function Areas() {
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");

  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setError("");
      setLoading(true);
      const data = await fetchAllAreas();
      setAreas(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e?.message || "Failed to load areas");
      setAreas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const addArea = async (e) => {
    e.preventDefault();
    const c = city.trim();
    const p = postcode.trim().toUpperCase();
    if (!c || !p) return;

    try {
      setError("");
      await createArea({
        city: c,
        area: p, // using same value for "area"
        postcode: p, // and postcode (matches your old UI)
        isActive: true,
      });

      setCity("");
      setPostcode("");
      await load();
    } catch (e2) {
      setError(e2?.message || "Failed to add area");
    }
  };

  const toggleActive = async (id) => {
    const current = areas.find((a) => a._id === id);
    if (!current) return;

    try {
      setError("");
      await updateArea(id, { isActive: !current.isActive });
      await load();
    } catch (e) {
      setError(e?.message || "Failed to update");
    }
  };

  const remove = async (id) => {
    try {
      setError("");
      await removeArea(id);
      await load();
    } catch (e) {
      setError(e?.message || "Failed to delete");
    }
  };

  const stats = useMemo(() => {
    const active = areas.filter((a) => a.isActive).length;
    return { total: areas.length, active };
  }, [areas]);

  return (
    <AdminShell title="Service Areas">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="text-sm text-slate-600">
          Total: <span className="font-semibold">{stats.total}</span> • Active:{" "}
          <span className="font-semibold">{stats.active}</span>
        </div>

        <button
          onClick={load}
          className="px-4 py-2 rounded-xl bg-slate-100 font-semibold hover:bg-slate-200"
          type="button"
        >
          Reload
        </button>
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={addArea}
        className="mt-5 bg-slate-50 border rounded-2xl p-4"
      >
        <div className="grid sm:grid-cols-3 gap-3">
          <input
            className="rounded-xl border px-3 py-2"
            placeholder="City (e.g., Derby)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            className="rounded-xl border px-3 py-2"
            placeholder="Postcode/Area (e.g., DE1)"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
          />
          <button className="rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700">
            Add Area
          </button>
        </div>
      </form>

      <div className="mt-6 overflow-x-auto">
        {loading ? (
          <div className="text-slate-600">Loading…</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-left text-slate-600">
              <tr className="border-b">
                <th className="py-3">City</th>
                <th className="py-3">Postcode</th>
                <th className="py-3">Status</th>
                <th className="py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {areas.map((a) => (
                <tr key={a._id} className="border-b">
                  <td className="py-3 font-medium text-slate-900">{a.city}</td>
                  <td className="py-3">{a.postcode}</td>
                  <td className="py-3">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full border text-xs font-semibold ${
                        a.isActive
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {a.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => toggleActive(a._id)}
                        className="px-3 py-1.5 rounded-xl border hover:bg-slate-50 font-semibold"
                        type="button"
                      >
                        Toggle
                      </button>
                      <button
                        onClick={() => remove(a._id)}
                        className="px-3 py-1.5 rounded-xl border hover:bg-red-50 font-semibold"
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {areas.length === 0 && (
                <tr>
                  <td className="py-6 text-slate-600" colSpan={4}>
                    No areas yet — add your first area above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </AdminShell>
  );
}
