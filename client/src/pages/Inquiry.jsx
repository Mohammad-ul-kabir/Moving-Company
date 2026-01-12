import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { addInquiry } from "../services/inquiriesStore";

export default function Inquiry() {
  const nav = useNavigate();
  const location = useLocation();

  // Optional prefill when coming from QuoteCard
  const prefill = location.state?.prefill;

  const [form, setForm] = useState(() => ({
    moveType: prefill?.moveType ?? "",
    name: "",
    phone: "",
    email: "",
    pickup: prefill?.pickup ?? "",
    delivery: prefill?.delivery ?? "",
    hasDate: prefill?.hasDate ?? true,
    moveDate: prefill?.moveDate ?? "",
    notes: "",
  }));

  const update = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const toggleHasDate = () => {
    setForm((p) => ({
      ...p,
      hasDate: !p.hasDate,
      moveDate: p.hasDate ? "" : p.moveDate, // if switching to "No", clear date
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();

    addInquiry({
      moveType: form.moveType,
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      pickup: form.pickup.trim(),
      delivery: form.delivery.trim(),
      moveDate: form.hasDate ? form.moveDate : "",
      notes: form.notes.trim(),
    });

    nav("/success", { state: { type: "inquiry" } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold text-slate-900">Get a Quote</h1>
          <p className="text-slate-600 mt-2">
            Fill in the details and we’ll contact you soon.
          </p>

          <form
            onSubmit={onSubmit}
            className="mt-6 bg-white border rounded-2xl shadow-sm p-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Move type full width */}
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-slate-700">
                  Move Type
                </label>
                <select
                  value={form.moveType}
                  onChange={(e) => update("moveType", e.target.value)}
                  className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  required
                >
                  <option value="" disabled>
                    Select Move Type
                  </option>
                  <option value="home">Home Move</option>
                  <option value="furniture">Furniture & Large Items</option>
                  <option value="vehicle">Vehicle Transport</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <input
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Phone
                </label>
                <input
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="07..."
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-slate-700">
                  Email (optional)
                </label>
                <input
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="you@email.com"
                  type="email"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Pickup Location
                </label>
                <input
                  value={form.pickup}
                  onChange={(e) => update("pickup", e.target.value)}
                  className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Pickup postcode / area"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Delivery Location
                </label>
                <input
                  value={form.delivery}
                  onChange={(e) => update("delivery", e.target.value)}
                  className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Delivery postcode / area"
                  required
                />
              </div>

              {/* Date input */}
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Move Date
                </label>
                <input
                  type="date"
                  value={form.moveDate}
                  onChange={(e) => update("moveDate", e.target.value)}
                  disabled={!form.hasDate}
                  required={form.hasDate}
                  className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-slate-100 disabled:text-slate-500"
                />
              </div>

              {/* Toggle */}
              <div className="flex items-end justify-between gap-3 rounded-xl border p-3">
                <div className="text-sm font-medium text-slate-700">
                  Choose Date?
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={toggleHasDate}
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${
                      form.hasDate ? "bg-blue-600" : "bg-slate-300"
                    }`}
                    aria-label="Toggle move date"
                    aria-pressed={form.hasDate}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                        form.hasDate ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                  <span className="text-sm font-semibold text-slate-700">
                    {form.hasDate ? "Yes" : "No"}
                  </span>
                </div>
              </div>

              {/* Notes full width */}
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-slate-700">
                  Notes (optional)
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 min-h-[110px]"
                  placeholder="Any details (floors, lift, heavy items, etc.)"
                />
              </div>
            </div>

            <button className="mt-5 w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700">
              Submit Inquiry
            </button>

            <p className="text-xs text-slate-500 mt-3">
              After submit, it will appear in Admin → Inquiries.
            </p>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
