const express = require("express");

const {
  getAll,
} = require("../controller/activityLog.controller");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();

router.use(
  authMiddleware,
  roleMiddleware("admin")
);

router.get("/", getAll);

module.exports = router;