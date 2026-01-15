const KEY = "mc_customer_auth";
const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

function save(auth) {
  localStorage.setItem(KEY, JSON.stringify(auth));
}

export function getCustomerAuth() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearCustomerAuth() {
  localStorage.removeItem(KEY);
}

export function customerAuthHeaders(extra = {}) {
  const auth = getCustomerAuth();
  return auth?.token ? { ...extra, Authorization: `Bearer ${auth.token}` } : extra;
}

export async function customerRegister({ name, email, password }) {
  const res = await fetch(`${API}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  const data = await res.json(); // { token, user }
  save({ token: data.token, user: data.user, loggedInAt: Date.now() });
  return data;
}

export async function customerLogin({ email, password }) {
  const res = await fetch(`${API}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  const data = await res.json(); // { token, user }
  save({ token: data.token, user: data.user, loggedInAt: Date.now() });
  return data;
}
