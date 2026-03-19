const express = require("express");
const router = express.Router();

const { checkATS } = require("../controllers/atsController"); // ✅ IMPORTANT

router.post("/check", checkATS); // ✅ must be a function

module.exports = router;