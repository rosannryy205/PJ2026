const express = require("express");
const router = express.Router();

const requireAuth = require("../middleware/requireAuth");
const {
  addCartItemController,
  getCartController,
  updateCartItemController,
  removeCartItemController,
} = require("../controllers/cartController");

// Auth routes for Cart
router.post("/items", requireAuth, addCartItemController);
router.put("/items", requireAuth, updateCartItemController);
router.delete("/items", requireAuth, removeCartItemController);
router.get("/", requireAuth, getCartController);

module.exports = router;

