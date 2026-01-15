import { authHeaders } from "./authApi";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function request(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    ...options,
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  // endpoints return JSON
  return res.json();
}

// Customer: create inquiry (public)
export function createInquiry(payload) {
  return request("/api/inquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

// Admin: list inquiries (requires JWT)
export function listInquiries() {
  return request(`/api/inquiries?t=${Date.now()}`, {
    method: "GET",
    cache: "no-store",
    headers: authHeaders(),
  });
}

// Admin: update inquiry (requires JWT)
export function patchInquiry(id, patch) {
  return request(`/api/inquiries/${id}`, {
    method: "PATCH",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(patch),
  });
}
