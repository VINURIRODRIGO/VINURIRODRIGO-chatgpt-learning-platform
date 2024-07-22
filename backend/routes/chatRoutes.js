const express = require("express");
const router = express.Router();
const { chatWithGPT } = require("../controllers/chatController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, chatWithGPT);

module.exports = router;
