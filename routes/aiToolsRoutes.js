// routes/aiToolsRoutes.js
const express = require("express");
const router = express.Router();
const aiToolsController = require("../controllers/aiToolsController");

// GET /api/ai-tools
router.get("/", aiToolsController.getAITools);

module.exports = router;