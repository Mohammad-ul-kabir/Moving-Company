import jwt from "jsonwebtoken";

// Protect routes that require admin JWT
export default function requireAdmin(req, res, next) {
  const auth = req.headers.authorization || "";
  const [, token] = auth.split(" "); // "Bearer <token>"

  if (!token) return res.status(401).send("Missing token");

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload?.role !== "admin") return res.status(403).send("Forbidden");

    req.admin = payload; // { role, email, iat, exp }
    next();
  } catch {
    return res.status(401).send("Invalid token");
  }
}
