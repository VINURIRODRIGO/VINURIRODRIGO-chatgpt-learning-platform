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

// unknown routes

router.all("*", (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} does not exist`);
  err.statusCode = 404;
  next(err);
});

module.exports = router;
