const Course = require("../models/courseModel");
const User = require("../models/userModel"); // Ensure you have User model exported from userModel.js

// Create a course
const createCourse = async (req, res) => {
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
    res.status(400).json({ error: error.message });
  }
};

// Fetch all courses and populate createdBy
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate(
      "createdBy",
      "firstName lastName"
    );
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createCourse, getCourses };
