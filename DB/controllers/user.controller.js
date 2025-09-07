const User = require("../models/user.model");
const catchAsync = require("../utils/catch-async.utils");
const AppError = require("../utils/app-error.utils");

exports.createUser = (role) => {
  return catchAsync(async (req, res) => {
    const { name, email, password, phone, address } = req.body;
    const user = await User.create({
      name,
      email,
      password,
      phone,
      address,
      role,
    });
    res.status(201).json({ message: `${role} created`, data: user });
  });
};

exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find().select("-password");
  if (users.length === 0) {
    return next(new AppError("No users found", 404));
  }
  res.status(200).json({ message: "users data", data: users });
});

exports.getCurrentUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) return next(new AppError("User not found", 404));
  res.status(200).json({ message: "Current user data", data: user });
});

exports.updateCurrentUser = catchAsync(async (req, res, next) => {
  const { name, email, phone, address } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { name, email, phone, address },
    { new: true, runValidators: true }
  ).select("-password");

  if (!updatedUser) return next(new AppError("User not found", 404));

  res.status(200).json({ message: "User updated successfully", data: updatedUser });
});

