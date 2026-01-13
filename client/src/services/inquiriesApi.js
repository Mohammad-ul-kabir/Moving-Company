const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function request(path, options) {
  const res = await fetch(`${API}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  // handle errors nicely
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || `Request failed: ${res.status}`);
  }

  return res.json();
}

export function createInquiry(payload) {
  return request("/api/inquiries", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function listInquiries() {
  return request(`/api/inquiries?t=${Date.now()}`, {
    method: "GET",
    cache: "no-store",
  });
}


export function patchInquiry(id, patch) {
  return request(`/api/inquiries/${id}`, {
    method: "PATCH",
    body: JSON.stringify(patch),
  });
}
