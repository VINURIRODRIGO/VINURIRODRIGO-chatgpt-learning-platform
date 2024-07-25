const express = require("express");
const router = express.Router();
const { sendMessage } = require("../controllers/chatController");
const requireAuth = require("../middleware/authMiddleware");

// Protect the route with requireAuth middleware
router.post("/chat", requireAuth, sendMessage);

module.exports = router;
