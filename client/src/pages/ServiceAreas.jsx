import { useEffect, useMemo, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { fetchServiceAreas } from "../services/areasApi";

function Badge({ active }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
        active
          ? "bg-green-50 text-green-700 border-green-200"
          : "bg-amber-50 text-amber-700 border-amber-200"
      }`}
    >
      {active ? "Available" : "Not available"}
    </span>
  );
}

export default function ServiceAreas() {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [q, setQ] = useState("");
  const [showAll, setShowAll] = useState(false);

  const load = async () => {
    try {
      setError("");
      setLoading(true);

      const data = await fetchServiceAreas({ all: showAll });
      setAreas(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e?.message || "Failed to load areas");
      setAreas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const onFocus = () => load();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAll]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    let list = areas;

    // If API already returns active-only when showAll=false,
    // this filter is harmless (keeps your UI behavior consistent)
    if (!showAll) list = list.filter((a) => a.isActive);

    if (!query) return list;

    return list.filter((a) => {
      const hay = `${a.city} ${a.area} ${a.postcode}`.toLowerCase();
      return hay.includes(query);
    });
  }, [areas, q, showAll]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Service Areas</h1>
            <p className="text-slate-600 mt-2">
              Search by city, area, or postcode to check availability.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={showAll}
                onChange={(e) => setShowAll(e.target.checked)}
              />
              Show inactive areas too
            </label>

            <button
              onClick={load}
              className="px-4 py-2 rounded-xl bg-slate-100 font-semibold hover:bg-slate-200"
            >
              Reload
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Search */}
        <div className="mt-6 bg-white border rounded-2xl shadow-sm p-4">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Type postcode (e.g., DE1) or city (e.g., Derby)"
            className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <div className="text-xs text-slate-500 mt-2">
            Tip: try “DE1”, “Derby”, “NG1”…
          </div>
        </div>

        {/* Results */}
        <div className="mt-6">
          {loading ? (
            <div className="text-slate-600">Loading areas…</div>
          ) : filtered.length === 0 ? (
            <div className="bg-white border rounded-2xl p-6 shadow-sm">
              <div className="font-semibold text-slate-900">No results</div>
              <p className="text-slate-600 mt-1">
                Try a different postcode/city or enable “Show inactive areas
                too”.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((a) => (
                <div
                  key={a._id || a.id}
                  className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-slate-900">
                        {a.city}
                      </div>
                      <div className="text-sm text-slate-600 mt-1">
                        Area: {a.area} • Postcode: {a.postcode}
                      </div>
                    </div>
                    <Badge active={a.isActive} />
                  </div>

                  <div className="mt-4">
                    {a.isActive ? (
                      <a
                        href="/book"
                        className="inline-flex px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
                      >
                        Book now
                      </a>
                    ) : (
                      <a
                        href="/inquiry"
                        className="inline-flex px-4 py-2 rounded-xl bg-slate-100 text-slate-900 font-semibold hover:bg-slate-200"
                      >
                        Request service
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
