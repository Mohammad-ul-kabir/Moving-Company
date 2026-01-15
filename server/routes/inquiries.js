import express from "express";
import requireAdmin from "../middleware/requireAdmin.js";
import Inquiry from "../models/Inquiry.js";

const router = express.Router();

// POST /api/inquiries (public)
router.post("/", async (req, res) => {
  try {
    const payload = {
      moveType: req.body.moveType || "",
      name: String(req.body.name || "").trim(),
      phone: String(req.body.phone || "").trim(),
      email: String(req.body.email || "").trim(),
      pickup: String(req.body.pickup || "").trim(),
      delivery: String(req.body.delivery || "").trim(),
      moveDate: req.body.moveDate || "",
      notes: String(req.body.notes || "").trim(),
      status: "NEW",
    };

    if (!payload.name || !payload.phone || !payload.pickup || !payload.delivery) {
      return res.status(400).send("name, phone, pickup, delivery are required");
    }

    const created = await Inquiry.create(payload);
    res.status(201).json(created);
  } catch (e) {
    res.status(500).send(e.message || "Server error");
  }
});

// GET /api/inquiries (admin)
router.get("/", requireAdmin, async (req, res) => {
  try {
    const items = await Inquiry.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (e) {
    res.status(500).send(e.message || "Server error");
  }
});

// PATCH /api/inquiries/:id (admin)
router.patch("/:id", requireAdmin, async (req, res) => {
  try {
    const patch = {};
    if (typeof req.body.status === "string") patch.status = req.body.status;

    const updated = await Inquiry.findByIdAndUpdate(req.params.id, patch, {
      new: true,
    });

    if (!updated) return res.status(404).send("Not found");
    res.json(updated);
  } catch (e) {
    res.status(500).send(e.message || "Server error");
  }
});

export default router;
