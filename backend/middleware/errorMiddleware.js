const customErrorHandler = require("../utils/customErrorHandler");

const ErrorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid : ${err.path}`;
    err = new customErrorHandler(message, 400);
  }

  // Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate  ${Object.keys(err.keyValue)} entered`;
    err = new customErrorHandler(message, 400);
  }

  // wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = "Json web token is invalid. Please try again.";
    err = new customErrorHandler(message, 400);
  }

  // JWT token expired error

  if (err.name === "TokenExpiredError") {
    const message = "Json web token has expired. Please try again.";
    err = new customErrorHandler(message, 401);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

module.exports = ErrorMiddleware;
