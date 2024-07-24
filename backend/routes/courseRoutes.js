const express = require("express");
const router = express.Router();
const { createCourse, getCourses } = require("../controllers/courseController");
const requireAuth = require("../middleware/authMiddleware");

// Use requireAuth middleware to protect routes
router.post("/courses", requireAuth, createCourse);
router.get("/courses", getCourses);

module.exports = router;
