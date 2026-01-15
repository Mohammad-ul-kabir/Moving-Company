const KEY = "mc_admin_auth";
const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Save token in localStorage
function save(auth) {
  localStorage.setItem(KEY, JSON.stringify(auth));
}

// Read token from localStorage
export function getAdminAuth() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Clear token
export function clearAdminAuth() {
  localStorage.removeItem(KEY);
}

// Backend login -> store token
export async function adminLogin(email, password) {
  const res = await fetch(`${API}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  const data = await res.json(); // { token, email }
  save({ token: data.token, email: data.email, loggedInAt: Date.now() });
  return data;
}

// Helper: add Authorization header
export function authHeaders(extra = {}) {
  const auth = getAdminAuth();
  return auth?.token
    ? { ...extra, Authorization: `Bearer ${auth.token}` }
    : extra;
}
