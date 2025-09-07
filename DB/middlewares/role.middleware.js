const AppError = require("../utils/app-error.utils");

exports.authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return next(new AppError("Access denied", 403));
    }
    next();
  };
};
