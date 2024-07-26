const express = require("express");
const router = express.Router();
const { sendMessage } = require("../controllers/chatController");
const requireAuth = require("../middleware/authMiddleware");
/**
 * @swagger
 * /api/chat:
 *   post:
 *     summary: Send a message to the chatbot
 *     security:
 *       - bearerAuth: []
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Tell me about the available courses"
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reply:
 *                   type: string
 *                   example: "Here are some courses based on your query..."
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
// Protect the route with requireAuth middleware
router.post("/chat", requireAuth, sendMessage);

module.exports = router;
