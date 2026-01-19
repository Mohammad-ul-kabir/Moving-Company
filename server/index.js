import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import adminRouter from "./routes/admin.js";
import areasRouter from "./routes/areas.js";
import authRouter from "./routes/auth.js";
import bookingsRouter from "./routes/bookings.js";
import inquiriesRouter from "./routes/inquiries.js";
import meRouter from "./routes/me.js";




dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/api/bookings", bookingsRouter);

app.use("/api/areas", areasRouter);
app.use("/api/inquiries", inquiriesRouter);


app.use("/api/admin", adminRouter);

app.use("/api/auth", authRouter);
app.use("/api/me", meRouter);



// test route
app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Backend is running" });
});

// start server only after DB connection
const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ DB connection error:", err.message);
    process.exit(1);
  }
}

start();
