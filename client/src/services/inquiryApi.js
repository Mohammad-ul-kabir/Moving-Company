import { getInquiries, saveInquiries } from "./adminStore";

export function createInquiry(payload) {
  const inquiries = getInquiries();

  const newInquiry = {
    id: crypto.randomUUID(),
    status: "NEW",
    createdAt: new Date().toISOString(),
    ...payload,
  };

  const next = [newInquiry, ...inquiries];
  saveInquiries(next);
  return newInquiry;
}
