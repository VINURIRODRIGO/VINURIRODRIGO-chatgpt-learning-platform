const checkRole = (roles) => {
  return async (req, res, next) => {
    if (req.user && roles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).send("Unauthorized Access");
    }
  };
};
module.exports = { checkRole };
