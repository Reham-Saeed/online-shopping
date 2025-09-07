const Subcategory = require("../models/subcategory.model");
const AppError = require("../utils/app-error.utils");
const catchAsync = require("../utils/catch-async.utils");

exports.getSubcategories = catchAsync(async (req, res, next) => {
  const filter = { isDeleted: false };

  if (req.query.category) filter.category = req.query.category;

  const subcategories = await Subcategory.find(filter).populate("category", "title");
  res.status(200).json({ message: "Subcategory list", data: subcategories });
});

exports.addSubcategory = catchAsync(async (req, res, next) => {
  const { title, category } = req.body;
  const image = req.file ? req.file.filename : "";

  const subcategory = await Subcategory.create({ title, category, image });
  res.status(201).json({ message: "Subcategory added successfully", data: subcategory });
});

exports.updateSubcategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { title, category } = req.body;

  const updateData = { title, category };
  if (req.file) {
    updateData.image = req.file.filename;
  }

  const updatedSubcategory = await Subcategory.findByIdAndUpdate(id, updateData, { new: true }).populate("category", "title");

  if (!updatedSubcategory) {
    return next(new AppError("Subcategory not found", 404));
  }

  res.status(200).json({ message: "Subcategory updated successfully", data: updatedSubcategory });
});

exports.toggleDeleteSubcategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  
  const subcategory = await Subcategory.findById(id);
  if (!subcategory) return next(new AppError("Subcategory not found", 404));

  subcategory.isDeleted = !subcategory.isDeleted;
  await subcategory.save();

  res.status(200).json({ message: "Subcategory status updated", data: subcategory });
});
