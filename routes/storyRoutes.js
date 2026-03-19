const express = require("express");
const router = express.Router();

const { generateStory } = require("../controllers/storyController");

// ✅ matches: /api/stories
router.post("/", generateStory);

module.exports = router;