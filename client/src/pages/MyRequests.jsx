import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
  clearCustomerAuth,
  getCustomerAuth,
} from "../services/customerAuthApi";
import { myBookings, myInquiries } from "../services/meApi";

export default function MyRequests() {
  const nav = useNavigate();
  const auth = getCustomerAuth();

  const [bookings, setBookings] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const load = async () => {
    try {
      setErr("");
      setLoading(true);
      const [b, i] = await Promise.all([myBookings(), myInquiries()]);
      setBookings(Array.isArray(b) ? b : []);
      setInquiries(Array.isArray(i) ? i : []);
    } catch (e) {
      const msg = String(e?.message || "");
      if (msg.includes("HTTP 401")) {
        clearCustomerAuth();
        nav("/login", { replace: true });
        return;
      }
      setErr(e?.message || "Failed to load");
      setBookings([]);
      setInquiries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    clearCustomerAuth();
    nav("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-10 space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Requests</h1>
            <p className="text-slate-600 mt-2">
              Signed in as{" "}
              <span className="font-semibold">{auth?.user?.email}</span>
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={load}
              className="px-4 py-2 rounded-xl bg-slate-100 font-semibold hover:bg-slate-200"
            >
              Reload
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800"
            >
              Logout
            </button>
          </div>
        </div>

        {err && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {err}
          </div>
        )}

        {loading ? (
          <div className="text-slate-600">Loading…</div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Bookings */}
            <div className="bg-white border rounded-2xl shadow-sm p-5">
              <h2 className="text-xl font-bold text-slate-900">Bookings</h2>
              <p className="text-sm text-slate-600 mt-1">
                Total: <span className="font-semibold">{bookings.length}</span>
              </p>

              <div className="mt-4 space-y-3">
                {bookings.map((b) => (
                  <div key={b._id} className="rounded-xl border p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="font-semibold text-slate-900">
                        {b.pickup} → {b.delivery}
                      </div>
                      <span className="text-xs font-semibold rounded-full border px-2 py-1">
                        {b.status}
                      </span>
                    </div>
                    <div className="text-sm text-slate-600 mt-1">
                      Move date: {b.moveDate || "—"}
                    </div>
                  </div>
                ))}

                {bookings.length === 0 && (
                  <div className="text-sm text-slate-600">No bookings yet.</div>
                )}
              </div>
            </div>

            {/* Inquiries */}
            <div className="bg-white border rounded-2xl shadow-sm p-5">
              <h2 className="text-xl font-bold text-slate-900">Inquiries</h2>
              <p className="text-sm text-slate-600 mt-1">
                Total: <span className="font-semibold">{inquiries.length}</span>
              </p>

              <div className="mt-4 space-y-3">
                {inquiries.map((x) => (
                  <div key={x._id} className="rounded-xl border p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="font-semibold text-slate-900">
                        {x.pickup} → {x.delivery}
                      </div>
                      <span className="text-xs font-semibold rounded-full border px-2 py-1">
                        {x.status}
                      </span>
                    </div>
                    <div className="text-sm text-slate-600 mt-1">
                      Move date: {x.moveDate || "—"}
                    </div>
                  </div>
                ))}

                {inquiries.length === 0 && (
                  <div className="text-sm text-slate-600">
                    No inquiries yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
