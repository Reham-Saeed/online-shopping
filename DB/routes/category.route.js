const express = require("express");
const { upload } = require("../middlewares/upload.middleware");
const router = express.Router();
const { authenticate } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");
const {
  getCategories,
  updateCategory,
  addCategory,
  toggleDeleteCategory,
} = require("../controllers/category.controller");

router.get("/", getCategories);
router.post(
  "/",
  upload.single("image"),
  authenticate,
  authorize("admin"),
  addCategory
);
router.put(
  "/:id",
  upload.single("image"),
  authenticate,
  authorize("admin"),
  updateCategory
);
router.patch("/:id", authenticate, authorize("admin"), toggleDeleteCategory);

module.exports = router;
