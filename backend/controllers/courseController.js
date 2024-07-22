const asyncHandler = require("express-async-handler");
const Course = require("../models/courseModel");

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({});
  res.json(courses);
});

// @desc    Get course by ID
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    res.json(course);
  } else {
    res.status(404);
    throw new Error("Course not found");
  }
});

// @desc    Create a course
// @route   POST /api/courses
// @access  Private/Admin
const createCourse = asyncHandler(async (req, res) => {
  const { title, description, instructor, price } = req.body;

  const course = new Course({
    title,
    description,
    instructor,
    price,
  });

  const createdCourse = await course.save();
  res.status(201).json(createdCourse);
});

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private/Admin
const updateCourse = asyncHandler(async (req, res) => {
  const { title, description, instructor, price } = req.body;

  const course = await Course.findById(req.params.id);

  if (course) {
    course.title = title || course.title;
    course.description = description || course.description;
    course.instructor = instructor || course.instructor;
    course.price = price || course.price;

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } else {
    res.status(404);
    throw new Error("Course not found");
  }
});

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    await course.remove();
    res.json({ message: "Course removed" });
  } else {
    res.status(404);
    throw new Error("Course not found");
  }
});

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
