import express from "express";
import jwt from "jsonwebtoken";
import requireAdmin from "../middleware/requireAdmin.js";
import Area from "../models/Area.js";

const router = express.Router();

// Read admin token (optional) so we can protect "?all=true"
function getAdminPayload(req) {
  const auth = req.headers.authorization || "";
  const parts = auth.split(" ");
  const token = parts.length === 2 && parts[0] === "Bearer" ? parts[1] : "";
  if (!token) return null;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload?.role !== "admin") return null;
    return payload;
  } catch {
    return null;
  }
}

// GET /api/areas
// - default: active only
// - if ?all=true => admin only
router.get("/", async (req, res) => {
  try {
    const wantsAll = String(req.query.all || "") === "true";

    if (wantsAll) {
      const admin = getAdminPayload(req);
      if (!admin) return res.status(401).send("Missing/invalid admin token");
      const items = await Area.find().sort({ createdAt: -1 });
      return res.json(items);
    }

    const items = await Area.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(items);
  } catch (e) {
    res.status(500).send(e.message || "Server error");
  }
});

// POST /api/areas (admin)
router.post("/", requireAdmin, async (req, res) => {
  try {
    const city = String(req.body.city || "").trim();
    const area = String(req.body.area || "").trim();
    const postcode = String(req.body.postcode || "").trim().toUpperCase();
    const isActive = req.body.isActive !== false;

    if (!city || !postcode) {
      return res.status(400).send("city and postcode are required");
    }

    const created = await Area.create({
      city,
      area: area || postcode, // fallback if you don't send area
      postcode,
      isActive,
    });

    res.status(201).json(created);
  } catch (e) {
    res.status(500).send(e.message || "Server error");
  }
});

// PATCH /api/areas/:id (admin)
router.patch("/:id", requireAdmin, async (req, res) => {
  try {
    const patch = {};

    if (typeof req.body.city === "string") patch.city = req.body.city.trim();
    if (typeof req.body.area === "string") patch.area = req.body.area.trim();
    if (typeof req.body.postcode === "string")
      patch.postcode = req.body.postcode.trim().toUpperCase();
    if (typeof req.body.isActive === "boolean") patch.isActive = req.body.isActive;

    const updated = await Area.findByIdAndUpdate(req.params.id, patch, {
      new: true,
    });

    if (!updated) return res.status(404).send("Not found");
    res.json(updated);
  } catch (e) {
    res.status(500).send(e.message || "Server error");
  }
});

// DELETE /api/areas/:id (admin)
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const deleted = await Area.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send("Not found");
    res.json({ ok: true });
  } catch (e) {
    res.status(500).send(e.message || "Server error");
  }
});

export default router;
