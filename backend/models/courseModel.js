const express = require("express");
const router = express.Router();
const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");
const { protect, admin } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(getCourses) // Ensure getCourses is defined and imported correctly
  .post(protect, admin, createCourse); // Ensure createCourse is defined and imported correctly

router
  .route("/:id")
  .get(getCourseById) // Ensure getCourseById is defined and imported correctly
  .put(protect, admin, updateCourse) // Ensure updateCourse is defined and imported correctly
  .delete(protect, admin, deleteCourse); // Ensure deleteCourse is defined and imported correctly

module.exports = router;
