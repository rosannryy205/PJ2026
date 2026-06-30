const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getAllProductFeatures,
  getAllProductPopular,
  getAllProductNewArrival,
  getProductById,
} = require("../controllers/productController");

// Định nghĩa route để lấy tất cả sản phẩm
router.get("/", getAllProducts);
// Định nghĩa route để lấy các tính năng nổi bật của sản phẩm
router.get("/features", getAllProductFeatures);
// Định nghĩa route để lấy các sản phẩm phổ biến
router.get("/popular", getAllProductPopular);
// Định nghĩa route để lấy các sản phẩm phổ biến
router.get("/newarrival", getAllProductNewArrival);
// Định nghĩa route để lấy sản phẩm theo ID
router.get("/:id", getProductById);

// Xuất router để sử dụng trong app.js
module.exports = router;
