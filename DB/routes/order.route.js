const express = require("express");
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/order.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");
const { loadCart } = require("../middlewares/cart.middleware");

router.use(authenticate);
router.use(loadCart);

router.post("/", createOrder);
router.get("/my-orders", getUserOrders);
router.get("/", authenticate, authorize("admin"), getAllOrders);
router.patch(
  "/:orderId/status",
  authenticate,
  authorize("admin"),
  updateOrderStatus
);

module.exports = router;
