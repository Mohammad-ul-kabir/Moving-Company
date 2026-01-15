import { authHeaders } from "./authApi";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

/**
 * Customer page
 * - all=false => public (active only)
 * - all=true  => admin-only (requires JWT)
 */
export async function fetchServiceAreas({ all = false } = {}) {
  const url = all
    ? `${API}/api/areas?all=true&t=${Date.now()}`
    : `${API}/api/areas?t=${Date.now()}`;

  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
    // only send auth header when asking for all areas (admin-only)
    headers: all ? authHeaders() : undefined,
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.json();
}

/** Admin: list all areas (requires JWT) */
export async function fetchAllAreas() {
  return fetchServiceAreas({ all: true });
}

/** Admin: create (requires JWT) */
export async function createArea(payload) {
  const res = await fetch(`${API}/api/areas`, {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.json();
}

/** Admin: update (requires JWT) */
export async function updateArea(id, patch) {
  const res = await fetch(`${API}/api/areas/${id}`, {
    method: "PATCH",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(patch),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.json();
}

/** Admin: delete (requires JWT) */
export async function removeArea(id) {
  const res = await fetch(`${API}/api/areas/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.json();
}
