// const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token, role: user.role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a student
const signupStudent = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await User.signupStudent(firstName, lastName, email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token, role: user.role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup an instructor
const signupInstructor = async (req, res) => {
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
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupStudent, signupInstructor, loginUser };
