import express from "express";
import Area from "../models/Area.js";

const router = express.Router();

/**
 * GET /api/areas
 * Customer use: returns only active areas by default.
 * Optional: ?all=true returns all (admin use for now).
 */
router.get("/", async (req, res) => {
  try {
    const all = req.query.all === "true";
    const filter = all ? {} : { isActive: true };

    const areas = await Area.find(filter).sort({ createdAt: -1 });
    res.json(areas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * POST /api/areas
 * Create a new area (admin use)
 */
router.post("/", async (req, res) => {
  try {
    const { city, area, postcode, isActive } = req.body;

    const doc = await Area.create({
      city,
      area,
      postcode,
      isActive: isActive ?? true,
    });

    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * PATCH /api/areas/:id
 * Update area (admin use)
 */
router.patch("/:id", async (req, res) => {
  try {
    const updated = await Area.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ message: "Area not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * DELETE /api/areas/:id
 * Delete area (admin use)
 */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Area.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Area not found" });
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
