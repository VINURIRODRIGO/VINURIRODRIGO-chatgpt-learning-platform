const Course = require("../models/courseModel");
const User = require("../models/userModel");
const catchAsyncError = require("../middleware/catchAsyncErrorMiddleWare");

// Create a course
const createCourse = catchAsyncError(async (req, res, next) => {
  const { title, description, image } = req.body;
  const userId = req.user._id;
  try {
    const course = await Course.create({
      title,
      description,
      image,
      createdBy: userId,
    });

    res.status(201).json(course);
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
});

// Fetch all courses and populate createdBy
const getCourses = catchAsyncError(async (req, res, next) => {
  try {
    const courses = await Course.find().populate(
      "createdBy",
      "firstName lastName"
    );
    res.status(200).json(courses);
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
});

// Enroll a student in a course
const enrollCourse = catchAsyncError(async (req, res, next) => {
  const { courseId } = req.body;
  const userId = req.user._id;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return next("Course not found");
    }
    if (course.enrolledStudents.includes(userId)) {
      return next("Already enrolled in this course");
    }

    course.enrolledStudents.push(userId);
    await course.save();

    res.status(200).json("Successfully enroll to the course");
  } catch (error) {
    next(error);
  }
});

// Fetch enrolled courses for a student
const getEnrolledCourses = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;

  try {
    const courses = await Course.find({ enrolledStudents: userId }).populate(
      "createdBy",
      "firstName lastName"
    );
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
});

const getCourseById = catchAsyncError(async (req, res, next) => {
  const courseId = req.params.id;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
});

// Fetch all courses created by a specific instructor
const getCoursesByInstructor = async (req, res, next) => {
  const instructorId = req.user._id;

  try {
    const courses = await Course.find({ createdBy: instructorId }).populate(
      "createdBy",
      "firstName lastName email"
    );

    if (!courses.length) {
      return res
        .status(404)
        .json({ error: "No courses found for this instructor" });
    }

    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

const updateCourse = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { title, description, image } = req.body;
  const userId = req.user._id;

  try {
    // Find the course by id
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Check if the logged-in user is the instructor who created the course
    if (course.createdBy._id.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this course" });
    }

    // Update course details
    course.title = title || course.title;
    course.description = description || course.description;
    course.image = image || course.image;

    await course.save();

    res.status(200).json(course);
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
});

module.exports = {
  createCourse,
  getCourses,
  enrollCourse,
  getEnrolledCourses,
  getCourseById,
  getCoursesByInstructor,
  updateCourse,
};
