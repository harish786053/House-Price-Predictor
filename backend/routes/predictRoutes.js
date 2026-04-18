const express = require("express");
const router = express.Router();
const predictController = require("../controllers/predictController");
const auth = require("../middleware/auth");

// Optionally protect predict route
// We use a middleware to check token, but since we don't want to block UI demo:
// Let's create an optional auth middleware
const optionalAuth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return next();
  try {
    const jwt = require("jsonwebtoken");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    next();
  }
};

router.post("/", optionalAuth, predictController.predictPrice);
router.get("/history", auth, predictController.getHistory);

module.exports = router;
