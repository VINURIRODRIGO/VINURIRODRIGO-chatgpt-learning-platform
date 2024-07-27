// userController.js
const User = require("../models/userModel");
const CustomErrorHandler = require("../utils/customErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncErrorMiddleWare");

// Fetch user details by ID
const getUserById = catchAsyncError(async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return next(new CustomErrorHandler("User not found", 404));
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = { getUserById };
