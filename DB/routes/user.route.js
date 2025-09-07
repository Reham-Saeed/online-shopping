const express = require("express");
const router = express.Router();
const {
  getUsers,
  createUser,
  getCurrentUser,
  updateCurrentUser,
} = require("../controllers/user.controller");
const { login } = require("../controllers/auth.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");

router.post("/admin", authenticate, authorize("admin"), createUser("admin"));
router.post("/", createUser("user"));
router.post("/login", login);
router.get("/", authenticate, authorize("admin"), getUsers);
router.get("/me", authenticate, authorize("user"), getCurrentUser);
router.put("/me", authenticate, authorize("user"), updateCurrentUser);

module.exports = router;
