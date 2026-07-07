const express = require("express");
const router = express.Router();
const {
  registerUser,
  sendVerificationCode,
} = require("../controllers/registerController");

// Gửi OTP xác minh email
router.post("/send-code", sendVerificationCode);

// Tạo tài khoản sau khi xác minh (server tự verify lại theo Option B)
router.post("/", registerUser);

module.exports = router;
