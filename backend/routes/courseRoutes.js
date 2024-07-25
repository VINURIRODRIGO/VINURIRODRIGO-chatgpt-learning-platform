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
  updateCourse,
} = require("../controllers/courseController");
const requireAuth = require("../middleware/authMiddleware");

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Course:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the course
 *         title:
 *           type: string
 *           description: The title of the course
 *         description:
 *           type: string
 *           description: The description of the course
 *         image:
 *           type: string
 *           description: The image URL of the course
 *         createdBy:
 *           type: string
 *           description: The id of the instructor who created the course
 *         enrolledStudents:
 *           type: array
 *           items:
 *             type: string
 *           description: The ids of the students enrolled in the course
 *       example:
 *         id: 60f8c74b3f1b2a3b9c8b4567
 *         title: "Learn Node.js"
 *         description: "A comprehensive Node.js course"
 *         image: "https://example.com/image.png"
 *         createdBy: "60f8c74b3f1b2a3b9c8b4567"
 *         enrolledStudents: ["60f8c74b3f1b2a3b9c8b4567"]
 */

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: The courses managing API
 */

/**
 * @swagger
 * /courses:
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
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       201:
 *         description: The course was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       500:
 *         description: Some server error
 */
// Use requireAuth middleware to protect routes
router.post("/courses", requireAuth, createCourse);

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Returns the list of all the courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: The list of the courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */
router.get("/courses", getCourses);

/**
 * @swagger
 * /courses/enroll:
 *   post:
 *     summary: Enroll a student in a course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courseId
 *             properties:
 *               courseId:
 *                 type: string
 *                 description: The id of the course to enroll in
 *             example:
 *               courseId: 60f8c74b3f1b2a3b9c8b4567
 *     responses:
 *       200:
 *         description: Successfully enroll to the course
 *       500:
 *         description: Some server error
 */
router.post("/courses/enroll", requireAuth, enrollCourse);

/**
 * @swagger
 * /courses/enrolled:
 *   get:
 *     summary: Get all courses enrolled by a student
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of enrolled courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */
router.get("/courses/enrolled", requireAuth, getEnrolledCourses);

/**
 * @swagger
 * /course/{id}:
 *   get:
 *     summary: Get a course by id
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The course id
 *     responses:
 *       200:
 *         description: The course description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: The course was not found
 */
router.get("/course/:id", requireAuth, getCourseById);

/**
 * @swagger
 * /courses/instructor/{id}:
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
 *         description: The instructor id
 *     responses:
 *       200:
 *         description: The list of courses created by the instructor
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       404:
 *         description: No courses found for this instructor
 */
router.get("/courses/instructor/:id", requireAuth, getCoursesByInstructor);

/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     summary: Update a course by id
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The course id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: The course was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       403:
 *         description: You are not authorized to update this course
 *       404:
 *         description: The course was not found
 */
router.put("/courses/:id", requireAuth, updateCourse);

module.exports = router;
