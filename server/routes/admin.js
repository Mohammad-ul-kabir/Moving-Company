import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// tiny helper: safer string compare
function safeEqual(a = "", b = "") {
  if (a.length !== b.length) return false;
  let ok = 0;
  for (let i = 0; i < a.length; i++) ok |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return ok === 0;
}

// POST /api/admin/login
router.post("/login", async (req, res) => {
  const email = String(req.body?.email || "").trim().toLowerCase();
  const password = String(req.body?.password || "");

  const adminEmail = String(process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const adminPassword = String(process.env.ADMIN_PASSWORD || "");
  const secret = process.env.JWT_SECRET;

  if (!adminEmail || !adminPassword || !secret) {
    return res.status(500).send("Missing ADMIN_EMAIL / ADMIN_PASSWORD / JWT_SECRET in env");
  }

  const okEmail = safeEqual(email, adminEmail);
  const okPass = safeEqual(password, adminPassword);

  if (!okEmail || !okPass) {
    return res.status(401).send("Invalid credentials");
  }

  const token = jwt.sign(
    { role: "admin", email: adminEmail },
    secret,
    { expiresIn: process.env.JWT_EXPIRES || "7d" }
  );

  res.json({ token, email: adminEmail });
});

export default router;
