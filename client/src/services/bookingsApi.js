import { authHeaders } from "./authApi";
import { customerAuthHeaders } from "./customerAuthApi";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Customer: create a booking (guest OR logged-in customer)
export async function createBooking(payload) {
  const res = await fetch(`${API}/api/bookings`, {
    method: "POST",
    headers: customerAuthHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.json();
}

// Admin: list bookings (requires admin JWT)
export async function listBookings() {
  const res = await fetch(`${API}/api/bookings?t=${Date.now()}`, {
    method: "GET",
    cache: "no-store",
    headers: authHeaders(),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.json();
}

// Admin: update booking status (requires admin JWT)
export async function updateBookingStatus(id, status) {
  const res = await fetch(`${API}/api/bookings/${id}`, {
    method: "PATCH",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.json();
}
