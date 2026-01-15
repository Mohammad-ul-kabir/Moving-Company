import jwt from "jsonwebtoken";

// Customer JWT required
export default function requireUser(req, res, next) {
  const auth = req.headers.authorization || "";
  const [type, token] = auth.split(" ");

  if (type !== "Bearer" || !token) return res.status(401).send("Missing token");

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload?.role !== "customer") return res.status(403).send("Forbidden");

    req.user = payload; // { role, userId, email, iat, exp }
    next();
  } catch {
    return res.status(401).send("Invalid token");
  }
}
