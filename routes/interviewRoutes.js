const express = require("express");
const router = express.Router();
const interviewController = require("../controllers/interviewController");

// GET /api/interviews?role=frontend
router.get("/", interviewController.getQuestions);

module.exports = router;