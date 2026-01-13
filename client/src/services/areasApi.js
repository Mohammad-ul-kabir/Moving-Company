const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

/**
 * Customer page
 * - all=false => backend returns active only
 * - all=true  => backend returns all (active + inactive)
 */
export async function fetchServiceAreas({ all = false } = {}) {
  const url = all
    ? `${API}/api/areas?all=true&t=${Date.now()}`
    : `${API}/api/areas?t=${Date.now()}`;

  const res = await fetch(url, { method: "GET", cache: "no-store" });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.json();
}

/** Admin: list all areas */
export async function fetchAllAreas() {
  return fetchServiceAreas({ all: true });
}

/** Admin: create */
export async function createArea(payload) {
  const res = await fetch(`${API}/api/areas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.json();
}

/** Admin: update */
export async function updateArea(id, patch) {
  const res = await fetch(`${API}/api/areas/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.json();
}

/** Admin: delete */
export async function removeArea(id) {
  const res = await fetch(`${API}/api/areas/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.json();
}
