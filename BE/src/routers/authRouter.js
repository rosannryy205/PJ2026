const express = require("express");
const router = express.Router();

const requireAuth = require("../middleware/requireAuth");
const {
  loginController,
  logoutController,
  meController,
} = require("../controllers/authController");

// Auth APIs
router.post("/login", loginController);
router.post("/logout", logoutController);
router.get("/me", requireAuth, meController);

module.exports = router;

