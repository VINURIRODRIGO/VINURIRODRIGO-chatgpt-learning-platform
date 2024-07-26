const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsyncError = require("../middleware/catchAsyncErrorMiddleWare");

const requireAuth = catchAsyncError(async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Authorization token is malformed" });
  }

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById({ _id }).select("role");
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Request is not authorized" });
    ErrorMiddleware("Request is not authorized", 401);
  }
});

module.exports = requireAuth;
