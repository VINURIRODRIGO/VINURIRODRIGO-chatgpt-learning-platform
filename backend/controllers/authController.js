// const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const catchAsyncError = require("../middleware/catchAsyncErrorMiddleWare");

// Create a token for a user
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// login a user
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ id: user._id, email, token, role: user.role });
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};

// signup a student
const signupStudent = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await User.signupStudent(firstName, lastName, email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token, role: user.role });
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
});

// signup an instructor
const signupInstructor = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, email, password, teachingExperience } = req.body;

  try {
    const user = await User.signupInstructor(
      firstName,
      lastName,
      email,
      password,
      teachingExperience
    );

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token, role: user.role });
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
});

module.exports = { signupStudent, signupInstructor, loginUser };
