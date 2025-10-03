import express from "express";
import authRoutes from "./src/routes/auth.route.js";
import messageRoutes from "./src/routes/message.route.js";
import dotenv from "dotenv";
import connectDB from "./src/lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./src/lib/socket.js";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// -------------------- MIDDLEWARE --------------------

// Enable CORS for local dev and deployed frontend
app.use(
  cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL || "https://chatty-nqwa.onrender.com"],
    credentials: true,
  })
);

// Increase payload limit for images
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser());

// -------------------- API ROUTES --------------------
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// -------------------- SERVE FRONTEND --------------------
const frontendPath = path.join(__dirname, "../frontend/dist");
console.log("Serving frontend from:", frontendPath);

app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  // Ignore API routes
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ error: "API route not found" });
  }
  res.sendFile(path.join(frontendPath, "index.html"));
});

// -------------------- START SERVER --------------------
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
  });
});
