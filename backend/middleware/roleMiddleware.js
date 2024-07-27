const catchAsyncError = require("../middleware/catchAsyncErrorMiddleWare");
const CustomErrorHandler = require("../utils/customErrorHandler");

const checkRole = (roles) => {
  return catchAsyncError(async (req, res, next) => {
    if (req.user && roles.includes(req.user.role)) {
      next();
    } else {
      next(new CustomErrorHandler("Unauthorized Access", 403));
    }
  });
};
module.exports = { checkRole };
