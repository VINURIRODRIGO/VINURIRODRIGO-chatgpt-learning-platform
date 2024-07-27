const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsyncError = require("../middleware/catchAsyncErrorMiddleWare");
const CustomErrorHandler = require("../utils/customErrorHandler");

const requireAuth = catchAsyncError(async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return next(new CustomErrorHandler("Authorization token required", 401));
  }

  const token = authorization.split(" ")[1];
  if (!token) {
    return next(
      new CustomErrorHandler("Authorization token is malformed", 401)
    );
  }

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById({ _id }).select("role");
    if (!user) {
      return next(new CustomErrorHandler("User not found", 404));
    }
    req.user = user;
    next();
  } catch (error) {
    next(new CustomErrorHandler("Request is not authorized", 401));
  }
});

module.exports = requireAuth;
