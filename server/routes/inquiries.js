import express from "express";
import Inquiry from "../models/Inquiry.js";

const router = express.Router();

/**
 * POST /api/inquiries
 * Customer submits inquiry
 */
router.post("/", async (req, res) => {
  try {
    const doc = await Inquiry.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * GET /api/inquiries
 * Admin views inquiries (later we will protect this)
 */
router.get("/", async (req, res) => {
  try {
    const items = await Inquiry.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * PATCH /api/inquiries/:id
 * Admin updates status (NEW/QUOTED/BOOKED/CLOSED)
 */
router.patch("/:id", async (req, res) => {
  try {
    const updated = await Inquiry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ message: "Inquiry not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
