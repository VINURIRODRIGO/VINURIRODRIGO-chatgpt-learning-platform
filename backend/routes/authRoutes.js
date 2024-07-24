// authRoutes.js
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 token:
 *                   type: string
 *                 role:
 *                   type: string
 *       400:
 *         description: Invalid email or password
 */
const express = require("express");
const router = express.Router();
const {
  loginUser,
  signupStudent,
  signupInstructor,
} = require("../controllers/authController");

// login route
router.post("/login", loginUser);

/**
 * @swagger
 * /api/auth/signup/student:
 *   post:
 *     summary: Signup a student
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully signed up
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 token:
 *                   type: string
 *                 role:
 *                   type: string
 *       400:
 *         description: Error in signup
 */

// signup routes
router.post("/signup/student", signupStudent);
router.post("/signup/instructor", signupInstructor);

// unknown routes

router.all("*", (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} does not exist`);
  err.statusCode = 404;
  next(err);
});

module.exports = router;
