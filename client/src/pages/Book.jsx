import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { createBooking } from "../services/bookingApi";

export default function Book() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    moveType: "",
    name: "",
    phone: "",
    email: "",
    pickup: "",
    delivery: "",
    moveDate: "",
    timeWindow: "Morning",
    notes: "",
  });

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const onSubmit = (e) => {
    e.preventDefault();

    createBooking({
      moveType: form.moveType,
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      pickup: form.pickup.trim(),
      delivery: form.delivery.trim(),
      moveDate: form.moveDate,
      timeWindow: form.timeWindow,
      notes: form.notes.trim(),
    });

    nav("/success", { state: { type: "booking" } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold text-slate-900">Instant Booking</h1>
          <p className="text-slate-600 mt-2">
            Book your move in minutes. Confirmation is instant.
          </p>

          <form
            onSubmit={onSubmit}
            className="mt-6 bg-white border rounded-2xl shadow-sm p-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  required
                  placeholder="Your name"
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
                  required
                  placeholder="07..."
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
                  type="email"
                  placeholder="you@email.com"
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
                  required
                  placeholder="Pickup postcode / area"
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
                  required
                  placeholder="Delivery postcode / area"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Move Date
                </label>
                <input
                  type="date"
                  value={form.moveDate}
                  onChange={(e) => update("moveDate", e.target.value)}
                  className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Time Window
                </label>
                <select
                  value={form.timeWindow}
                  onChange={(e) => update("timeWindow", e.target.value)}
                  className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <option>Morning</option>
                  <option>Afternoon</option>
                  <option>Evening</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-slate-700">
                  Notes (optional)
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 min-h-[110px]"
                  placeholder="Floors, lift access, heavy items, parking, etc."
                />
              </div>
            </div>

            <button className="mt-5 w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700">
              Confirm Booking
            </button>

            <p className="text-xs text-slate-500 mt-3">
              After booking, it will appear in Admin → Bookings.
            </p>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
