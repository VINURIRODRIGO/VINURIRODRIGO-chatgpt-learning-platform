const express = require("express");
const router = express.Router();
const {
  loginUser,
  signupStudent,
  signupInstructor,
} = require("../controllers/authController");
const { body } = require("express-validator");
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
 *                 id:
 *                   type: string
 *                 email:
 *                   type: string
 *                 token:
 *                   type: string
 *                 role:
 *                   type: string
 *       400:
 *         description: Invalid email or password
 */

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
router.post(
  "/signup/student",
  [
    body("firstName")
      .notEmpty()
      .withMessage("First name is required")
      .matches(/^[A-Za-z]+$/)
      .withMessage("First name can only contain letters"),
    body("lastName")
      .notEmpty()
      .withMessage("Last name is required")
      .matches(/^[A-Za-z]+$/)
      .withMessage("Last name can only contain letters"),
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
      .isStrongPassword()
      .withMessage("Password is not strong enough"),
  ],
  signupStudent
);

/**
 * @swagger
 * /api/auth/signup/instructor:
 *   post:
 *     summary: Signup an instructor
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
 *               teachingExperience:
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
router.post(
  "/signup/instructor",
  [
    body("firstName")
      .notEmpty()
      .withMessage("First name is required")
      .matches(/^[A-Za-z]+$/)
      .withMessage("First name can only contain letters"),
    body("lastName")
      .notEmpty()
      .withMessage("Last name is required")
      .matches(/^[A-Za-z]+$/)
      .withMessage("Last name can only contain letters"),
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
      .isStrongPassword()
      .withMessage("Password is not strong enough"),
    body("teachingExperience")
      .notEmpty()
      .withMessage("Teaching experience is required"),
  ],
  signupInstructor
);

// unknown routes

router.all("*", (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} does not exist`);
  err.statusCode = 404;
  next(err);
});

module.exports = router;
