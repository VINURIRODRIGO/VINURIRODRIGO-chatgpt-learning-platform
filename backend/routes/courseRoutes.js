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
const { checkRole } = require("../middleware/roleMiddleware");

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
 *         - image
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
 *                 example: The title of the course
 *               description:
 *                 type: string
 *                 example: The description of the course
 *               image:
 *                 type: string
 *                 example: http://example.com
 *     responses:
 *       201:
 *         description: The course was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 image:
 *                   type: string
 *       403:
 *         description: Access denied. Only instructors can create courses.
 *       500:
 *         description: Some server error
 */
// Use requireAuth middleware to protect routes
router.post("/courses", requireAuth, checkRole(["instructor"]), createCourse);

/**
 * @swagger
 * /api/courses:
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
router.get("/courses", requireAuth, checkRole(["student"]), getCourses);

/**
 * @swagger
 * /api/courses/enroll:
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
router.post(
  "/courses/enroll",
  requireAuth,
  checkRole(["student"]),
  enrollCourse
);

/**
 * @swagger
 * /api/courses/enrolled/{id}:
 *   get:
 *     summary: Get all courses enrolled by a specific student
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the student whose enrolled courses are to be retrieved
 *     responses:
 *       200:
 *         description: The list of enrolled courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get(
  "/courses/enrolled/:id",
  requireAuth,
  checkRole(["student"]),
  getEnrolledCourses
);

/**
 * @swagger
 * /api/course/{id}:
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
router.get(
  "/course/:id",
  requireAuth,
  checkRole(["instructor", "student"]),
  getCourseById
);

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
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the instructor whose courses are to be retrieved
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
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get(
  "/courses/instructor/:id",
  requireAuth,
  checkRole(["instructor"]),
  getCoursesByInstructor
);

/**
 * @swagger
 * /api/courses/{id}:
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
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated title
 *               description:
 *                 type: string
 *                 example: Updated description
 *               image:
 *                 type: string
 *                 example: Updated image URL
 *     responses:
 *       200:
 *         description: The course was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       403:
 *         description: Access denied. Only the instructor who created the course can update it.
 *       404:
 *         description: The course was not found
 *       500:
 *         description: Some server error
 */
router.put(
  "/courses/:id",
  requireAuth,
  checkRole(["instructor"]),
  updateCourse
);

module.exports = router;
