import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from 'morgan';

import path from "path";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.get("/health-check", (req, res) => {
  const logMessage = `🔥 Health endpoint hit at ${new Date().toISOString()} - Status: ok 🚀`;
  console.log(logMessage); // Log the custom message to the server logs
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

const healthCheckUrl = `https://verbix.onrender.com/health-check`;

setInterval(async () => {
  try {
    const response = await axios.get(healthCheckUrl);
    console.log("Health check passed:", response.data);
  } catch (error) {
    console.error("Health check failed:", error.message);
  }
}, 45000); // 45 seconds

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
