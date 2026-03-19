// backend/routes/resumeRoutes.js
const express = require("express");
const router = express.Router();
const resumeController = require("../controllers/resumeController");

// POST /api/resume/generate
router.post("/generate", resumeController.generateResume);

module.exports = router;