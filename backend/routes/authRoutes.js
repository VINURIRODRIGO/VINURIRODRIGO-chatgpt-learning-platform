const express = require("express");
const router = express.Router();
const {
  loginUser,
  signupStudent,
  signupInstructor,
} = require("../controllers/authController");

// login route
router.post("/login", loginUser);

// signup routes
router.post("/signup/student", signupStudent);
router.post("/signup/instructor", signupInstructor);

module.exports = router;
