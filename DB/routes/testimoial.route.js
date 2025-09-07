const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");
const {
  getApprovedTestimonials,
  getPendingTestimonials,
  addTestimonial,
  updateTestimonialStatus,
} = require("../controllers/testimonial.controller");

router.get("/", getApprovedTestimonials);
router.get("/admin", authenticate, authorize("admin"), getPendingTestimonials);
router.post("/", addTestimonial);
router.put(
  "/admin/:id",
  authenticate,
  authorize("admin"),
  updateTestimonialStatus
);

module.exports = router;
