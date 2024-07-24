// userController.js
const User = require("../models/userModel");
const customErrorHandler = require("../utils/customErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncErrorMiddleWare");

// Fetch user details by ID
const getUserById = catchAsyncError(async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = { getUserById };
