import { useMemo, useState } from "react";

export default function QuoteCard() {
  const [moveType, setMoveType] = useState("");
  const [pickup, setPickup] = useState("");
  const [delivery, setDelivery] = useState("");
  const [hasDate, setHasDate] = useState(true);
  const [moveDate, setMoveDate] = useState("");

  const canSubmit = useMemo(() => {
    if (!moveType || !pickup || !delivery) return false;
    if (hasDate && !moveDate) return false;
    return true;
  }, [moveType, pickup, delivery, hasDate, moveDate]);

  const toggleHasDate = () => {
    setHasDate((v) => {
      const next = !v;
      if (!next) setMoveDate(""); // clear date if user says "No"
      return next;
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    alert("Quote requested (mock).");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-lg bg-white shadow-lg overflow-hidden"
    >
      {/* 2-column grid on sm+ */}
      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Move type (full width) */}
        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-slate-700">
            Move Type
          </label>
          <select
            value={moveType}
            onChange={(e) => setMoveType(e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
          >
            <option value="" disabled>
              Select Move Type (e.g. Home Move)
            </option>
            <option value="home">Home Move</option>
            <option value="furniture">Furniture & Large Items</option>
            <option value="vehicle">Vehicle Transport</option>
          </select>
        </div>

        {/* Pickup (left col) */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            Pickup Location
          </label>
          <input
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            placeholder="Pickup postcode / area"
            className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
          />
        </div>

        {/* Delivery (right col) */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            Delivery Location
          </label>
          <input
            value={delivery}
            onChange={(e) => setDelivery(e.target.value)}
            placeholder="Delivery postcode / area"
            className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
          />
        </div>

        {/* Toggle (right col) */}
        <div className="justify-center">
          <div className=" flex ">
            <label className="text-sm font-medium text-slate-700">
              Do you fix your move date?
            </label>
          </div>

          <div className="flex items-end  gap-3 rounded-xl pt-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleHasDate}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${
                  hasDate ? "bg-blue-600" : "bg-slate-300"
                }`}
                aria-label="Toggle move date"
                aria-pressed={hasDate}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                    hasDate ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>

              <span className="text-sm font-semibold text-slate-700">
                {hasDate ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>

        {/* Move date input (left col) */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            Move Date
          </label>
          <input
            type="date"
            value={moveDate}
            onChange={(e) => setMoveDate(e.target.value)}
            disabled={!hasDate}
            className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-slate-100 disabled:text-slate-500"
            required={hasDate}
          />
        </div>
      </div>

      <div className="p-5 bg-slate-50 border-t">
        <button
          disabled={!canSubmit}
          className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-sm hover:bg-blue-700 disabled:opacity-60 disabled:hover:bg-blue-600"
        >
          Get Instant Quotes
        </button>
      </div>
    </form>
  );
}
