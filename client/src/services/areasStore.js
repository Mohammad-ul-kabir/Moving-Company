const KEY = "mc_service_areas";

const DEFAULT_AREAS = [
  { id: "a1", city: "Derby", area: "DE1", postcode: "DE1", isActive: true },
  { id: "a2", city: "Derby", area: "DE22", postcode: "DE22", isActive: true },
  { id: "a3", city: "Nottingham", area: "NG1", postcode: "NG1", isActive: false },
];

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

export function getAreas() {
  return read(KEY, DEFAULT_AREAS);
}

export function saveAreas(areas) {
  write(KEY, areas);
}

export function addArea(area) {
  const areas = getAreas();
  const next = [{ id: crypto.randomUUID(), ...area }, ...areas];
  saveAreas(next);
  return next;
}

export function updateArea(id, patch) {
  const areas = getAreas();
  const next = areas.map((a) => (a.id === id ? { ...a, ...patch } : a));
  saveAreas(next);
  return next;
}

export function deleteArea(id) {
  const areas = getAreas();
  const next = areas.filter((a) => a.id !== id);
  saveAreas(next);
  return next;
}
