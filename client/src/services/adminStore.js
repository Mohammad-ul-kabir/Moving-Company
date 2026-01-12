const KEYS = {
  AREAS: "mc_admin_areas",
  INQUIRIES: "mc_admin_inquiries",
  AUTH: "mc_admin_auth",
  BOOKINGS: "mc_admin_bookings",

};

function read(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Seed data (only if empty)
export function seedAdminData() {
  const existingAreas = read(KEYS.AREAS, null);
  if (!existingAreas) {
    write(KEYS.AREAS, [
      { id: "a1", city: "Derby", postcode: "DE1", isActive: true },
      { id: "a2", city: "Nottingham", postcode: "NG1", isActive: true },
      { id: "a3", city: "Leicester", postcode: "LE1", isActive: false },
    ]);
  }

  const existingInq = read(KEYS.INQUIRIES, null);
  if (!existingInq) {
    write(KEYS.INQUIRIES, [
      {
        id: "i1",
        name: "Sarah M",
        phone: "07123456789",
        pickup: "DE1",
        delivery: "NG1",
        moveDate: "2026-01-20",
        status: "NEW",
        createdAt: new Date().toISOString(),
      },
    ]);
  }
}

/** AUTH */
export function isAdminAuthed() {
  const a = read(KEYS.AUTH, null);
  return Boolean(a?.token);
}

export function adminLogin(email) {
  const token = crypto.randomUUID();
  write(KEYS.AUTH, { token, email, loggedInAt: Date.now() });
  return token;
}

export function adminLogout() {
  localStorage.removeItem(KEYS.AUTH);
}

/** AREAS */
export function getAreas() {
  return read(KEYS.AREAS, []);
}

export function saveAreas(areas) {
  write(KEYS.AREAS, areas);
}

/** INQUIRIES */
export function getInquiries() {
  return read(KEYS.INQUIRIES, []);
}

export function saveInquiries(inquiries) {
  write(KEYS.INQUIRIES, inquiries);
}

/** BOOKINGS */
export function getBookings() {
  return read(KEYS.BOOKINGS, []);
}

export function saveBookings(bookings) {
  write(KEYS.BOOKINGS, bookings);
}

const existingBookings = read(KEYS.BOOKINGS, null);
if (!existingBookings) {
  write(KEYS.BOOKINGS, []);
}

