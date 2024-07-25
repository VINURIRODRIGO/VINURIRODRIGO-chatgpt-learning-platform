// courseRoutes.js
const express = require("express");
const router = express.Router();
const {
  createCourse,
  getCourses,
  enrollCourse,
  getEnrolledCourses,
  getCourseById,
  getCoursesByInstructor,
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
/**
 * @swagger
 * /api/courses/instructor/{id}:
 *   get:
 *     summary: Get all courses created by a specific instructor
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Instructor ID
 *     responses:
 *       200:
 *         description: List of courses created by the instructor
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       404:
 *         description: No courses found for this instructor
 *       400:
 *         description: Error in fetching courses
 */
// Use requireAuth middleware to protect routes
router.post("/courses", requireAuth, createCourse);
router.get("/courses", getCourses);
router.post("/courses/enroll", requireAuth, enrollCourse);
router.get("/courses/enrolled", requireAuth, getEnrolledCourses);
router.get("/course/:id", requireAuth, getCourseById);
router.get("/courses/instructor/:id", requireAuth, getCoursesByInstructor);
module.exports = router;
