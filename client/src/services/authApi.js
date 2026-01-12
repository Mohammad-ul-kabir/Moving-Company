const KEY = "mc_admin_auth";

export function getAdminAuth() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setAdminAuth(auth) {
  localStorage.setItem(KEY, JSON.stringify(auth));
}

export function clearAdminAuth() {
  localStorage.removeItem(KEY);
}

// MOCK login for now (replace with backend later)
export async function adminLogin(email, password) {
  // simple check to simulate login
  if (!email || !password) throw new Error("Email and password required");

  // optional: restrict to one admin email during demo
  // if (email !== "admin@movingco.com") throw new Error("Not an admin");

  const token = crypto.randomUUID();
  const auth = { token, email, loggedInAt: Date.now() };
  setAdminAuth(auth);
  return auth;
}
