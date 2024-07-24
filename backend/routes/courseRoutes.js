// courseRoutes.js
const express = require("express");
const router = express.Router();
const {
  createCourse,
  getCourses,
  enrollCourse,
  getEnrolledCourses,
  getCourseById,
} = require("../controllers/courseController");
const requireAuth = require("../middleware/authMiddleware");
/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Course management routes
 */

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *               videos:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Course created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 image:
 *                   type: string
 *                 videos:
 *                   type: array
 *                   items:
 *                     type: string
 *                 createdBy:
 *                   type: string
 *       400:
 *         description: Error in creating course
 */

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: List of all courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   image:
 *                     type: string
 *                   videos:
 *                     type: array
 *                     items:
 *                       type: string
 *                   createdBy:
 *                     type: string
 *       400:
 *         description: Error in fetching courses
 */

// Use requireAuth middleware to protect routes
router.post("/courses", requireAuth, createCourse);
router.get("/courses", getCourses);
router.post("/courses/enroll", requireAuth, enrollCourse);
router.get("/courses/enrolled", requireAuth, getEnrolledCourses);
router.get("/course/:id", requireAuth, getCourseById);
module.exports = router;
