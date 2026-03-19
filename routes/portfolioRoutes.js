const express = require("express");
const router = express.Router();

// ✅ correct import (IMPORTANT)
const { generatePortfolio } = require("../controllers/portfolioController");

// ✅ route
router.post("/", generatePortfolio);

module.exports = router;