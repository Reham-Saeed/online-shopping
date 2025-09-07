const express = require("express");
const { authenticate } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");
const {
  getProducts,
  getProductByRoute,
  addProduct,
  updateProduct,
  getProductsByCategory,
  getProductsBySubcategory,
  toggleDeleteProduct,
} = require("../controllers/product.controller");
const { upload } = require("../middlewares/upload.middleware");
const router = express.Router();

router.get("/", getProducts);
router.get("/:route", getProductByRoute);
router.post(
  "/",
  upload.single("image"),
  authenticate,
  authorize("admin"),
  addProduct
);
router.put(
  "/:id",
  upload.single("image"),
  authenticate,
  authorize("admin"),
  updateProduct
);
router.patch("/:id", authenticate, authorize("admin"), toggleDeleteProduct);

module.exports = router;
