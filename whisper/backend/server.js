import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dashboardRoutes from "./routes/dashboard.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/whisperwall", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB error:", err.message));

// Routes
app.use("/api/dashboard", dashboardRoutes);
app.use("/", authRoutes);
app.use("/posts", postRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
