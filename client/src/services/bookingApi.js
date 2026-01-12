import { getBookings, saveBookings } from "./adminStore";

export function createBooking(payload) {
  const bookings = getBookings();

  const newBooking = {
    id: crypto.randomUUID(),
    status: "CONFIRMED",
    createdAt: new Date().toISOString(),
    ...payload,
  };

  const next = [newBooking, ...bookings];
  saveBookings(next);
  return newBooking;
}
