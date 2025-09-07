const Category = require("../models/category.model");
const AppError = require("../utils/app-error.utils");
const catchAsync = require("../utils/catch-async.utils");

exports.getCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find({ isDeleted: false });
  res.status(200).json({ message: "Category list", data: categories });
});

exports.addCategory = catchAsync(async (req, res, next) => {
  const { title } = req.body;
  const image = req.file ? req.file.filename : "";
  const category = await Category.create({ title, image });
  res
    .status(201)
    .json({ message: "Category added successfully", data: category });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { title } = req.body;

  const updateData = { title };
  if (req.file) {
    updateData.image = req.file.filename;
  }

  const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  if (!updatedCategory) {
    return next(new AppError("Category not found", 404));
  }

  res
    .status(200)
    .json({ message: "Category updated successfully", data: updatedCategory });
});

exports.toggleDeleteCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const category = await Category.findById(id);
  if (!category) return next(new AppError("Category not found", 404));

  category.isDeleted = !category.isDeleted;
  await category.save();

  res.status(200).json({ message: "Category status updated", data: category });
});
