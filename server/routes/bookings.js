import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

// GET /api/bookings  (admin list)
router.get("/", async (req, res) => {
  const items = await Booking.find().sort({ createdAt: -1 });
  res.json(items);
});

// POST /api/bookings  (customer creates booking)
router.post("/", async (req, res) => {
  const payload = {
    moveType: req.body.moveType || "",
    name: (req.body.name || "").trim(),
    phone: (req.body.phone || "").trim(),
    email: (req.body.email || "").trim(),
    pickup: (req.body.pickup || "").trim(),
    delivery: (req.body.delivery || "").trim(),
    moveDate: req.body.moveDate || "",
    notes: (req.body.notes || "").trim(),
  };

  // basic required validation
  if (!payload.name || !payload.phone || !payload.pickup || !payload.delivery) {
    return res.status(400).send("name, phone, pickup, delivery are required");
  }

  const created = await Booking.create(payload);
  res.status(201).json(created);
});

// PATCH /api/bookings/:id  (admin updates status or fields)
router.patch("/:id", async (req, res) => {
  const patch = {};
  if (typeof req.body.status === "string") patch.status = req.body.status;

  // optional admin edits
  if (typeof req.body.moveDate === "string") patch.moveDate = req.body.moveDate;
  if (typeof req.body.notes === "string") patch.notes = req.body.notes;

  const updated = await Booking.findByIdAndUpdate(req.params.id, patch, {
    new: true,
  });

  if (!updated) return res.status(404).send("Not found");
  res.json(updated);
});

// DELETE /api/bookings/:id  (optional admin delete)
router.delete("/:id", async (req, res) => {
  const deleted = await Booking.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).send("Not found");
  res.json({ ok: true });
});

export default router;
