const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const catchAsync = require("../utils/catch-async.utils");
const AppError = require("../utils/app-error.utils");

exports.authenticate = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("No token provided", 401));
  }
  const token = authHeader.split(" ")[1];
  const decode = jwt.verify(token, process.env.JWT_KEY);
  const user = await User.findById(decode.id).select("-password");
  if (!user) {
    return next(
      new AppError("Token invalid or expired", 401)
    );
  }
  req.user = user;
  next();
});
