const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/userController");

// Định nghĩa route để lấy tất cả người dùng
router.get("/", getAllUsers);


// Xuất router để sử dụng trong app.js
module.exports = router;