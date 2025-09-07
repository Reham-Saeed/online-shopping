const express = require("express");
const router = express.Router({ mergeParams: true });
const { upload } = require("../middlewares/upload.middleware");
const { authenticate } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");
const {
  getSubcategories,
  getSubcategoryByRoute,
  updateSubcategory,
  deleteSubcategory,
  addSubcategory,
  toggleDeleteSubcategory,
} = require("../controllers/subcategory.controller");

router.get("/", getSubcategories);
router.post(
  "/",
  upload.single("image"),
  authenticate,
  authorize("admin"),
  addSubcategory
);
router.put(
  "/:id",
  upload.single("image"),
  authenticate,
  authorize("admin"),
  updateSubcategory
);
router.patch("/:id", authenticate, authorize("admin"), toggleDeleteSubcategory); // هنا

module.exports = router;
