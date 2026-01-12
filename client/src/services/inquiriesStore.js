const KEY = "mc_inquiries";

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getInquiries() {
  return read(KEY, []);
}

export function addInquiry(payload) {
  const list = getInquiries();
  const item = {
    id: crypto.randomUUID(),
    status: "NEW", // NEW | QUOTED | BOOKED | CLOSED
    createdAt: new Date().toISOString(),
    ...payload,
  };
  const next = [item, ...list];
  write(KEY, next);
  return next;
}

export function updateInquiry(id, patch) {
  const list = getInquiries();
  const next = list.map((x) => (x.id === id ? { ...x, ...patch } : x));
  write(KEY, next);
  return next;
}
