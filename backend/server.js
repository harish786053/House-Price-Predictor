require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const predictRoutes = require("./routes/predictRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/predict", predictRoutes);

// Health check
app.get("/health", (req, res) => {
    res.json({ status: "ok", message: "HousePredict AI Backend is running." });
});

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/housepredict";

// Only connect if we have a URI (helpful for fallback when Mongo isn't running but we just want to boot)
// but for this project we require it.
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    // Still run the app so we can see UI without DB if needed
    console.log(`Starting server on port ${PORT} without DB connected...`);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (No DB)`);
    });
  });
