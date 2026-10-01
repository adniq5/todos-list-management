const express = require("express");

const {
  getSummaryStats,
} = require("../controller/stats.controller");

const apiKeyMiddleware = require("../middleware/apiKey.middleware");

const router = express.Router();

router.get(
  "/summary",
  apiKeyMiddleware,
  getSummaryStats
);

module.exports = router;