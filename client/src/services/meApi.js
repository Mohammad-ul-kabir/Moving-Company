import { customerAuthHeaders } from "./customerAuthApi";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function req(path) {
  const res = await fetch(`${API}${path}`, {
    method: "GET",
    cache: "no-store",
    headers: customerAuthHeaders(),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }
  return res.json();
}

export function myBookings() {
  return req(`/api/me/bookings?t=${Date.now()}`);
}

export function myInquiries() {
  return req(`/api/me/inquiries?t=${Date.now()}`);
}
