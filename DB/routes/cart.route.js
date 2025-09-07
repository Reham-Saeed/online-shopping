const express = require("express");
const router = express.Router({ mergeParams: true });
const { authenticate } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");
const {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  updateCartPrice,
  updateCartStock,
  validateCart,
} = require("../controllers/cart.controller");
const { loadCart } = require("../middlewares/cart.middleware");

router.use(loadCart);

router.get("/", getCart);
router.post("/", addToCart);
router.delete("/:productId", removeFromCart);
router.delete("/", clearCart);
router.patch("/update-price", updateCartPrice);
router.patch("/update-stock", updateCartStock);
router.get("/validate", validateCart);
router.patch("/:productId", updateQuantity);


module.exports = router;
