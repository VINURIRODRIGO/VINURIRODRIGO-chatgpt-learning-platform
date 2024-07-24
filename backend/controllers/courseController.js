const Course = require("../models/courseModel");
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

module.exports = { createCourse, getCourses };
