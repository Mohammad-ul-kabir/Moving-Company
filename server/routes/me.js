import express from "express";
import requireUser from "../middleware/requireUser.js";
import Booking from "../models/Booking.js";
import Inquiry from "../models/Inquiry.js";

const router = express.Router();

// GET /api/me/bookings  (customer only)
router.get("/bookings", requireUser, async (req, res) => {
  const userId = req.user.userId;
  const items = await Booking.find({ userId }).sort({ createdAt: -1 });
  res.json(items);
});

// GET /api/me/inquiries (customer only)
router.get("/inquiries", requireUser, async (req, res) => {
  const userId = req.user.userId;
  const items = await Inquiry.find({ userId }).sort({ createdAt: -1 });
  res.json(items);
});

export default router;
