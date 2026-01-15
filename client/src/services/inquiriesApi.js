import { authHeaders } from "./authApi";
import { customerAuthHeaders } from "./customerAuthApi";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function request(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    ...options,
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.json();
}

// Customer: create inquiry (guest OR logged-in customer)
export function createInquiry(payload) {
  return request("/api/inquiries", {
    method: "POST",
    headers: customerAuthHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(payload),
  });
}

// Admin: list inquiries (requires admin JWT)
export function listInquiries() {
  return request(`/api/inquiries?t=${Date.now()}`, {
    method: "GET",
    cache: "no-store",
    headers: authHeaders(),
  });
}

// Admin: update inquiry (requires admin JWT)
export function patchInquiry(id, patch) {
  return request(`/api/inquiries/${id}`, {
    method: "PATCH",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(patch),
  });
}
