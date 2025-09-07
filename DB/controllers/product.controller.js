const Product = require("../models/product.model");
const Category = require("../models/category.model");
const Subcategory = require("../models/subcategory.model");
const AppError = require("../utils/app-error.utils");
const catchAsync = require("../utils/catch-async.utils");

exports.getProducts = catchAsync(async (req, res) => {
  const { search, sort, category, subcategory } = req.query;

  const query = { isDeleted: false };

  if (category) {
    const categoryDoc = await Category.findOne({ title: category });
    if (!categoryDoc)
      return res.status(404).json({ message: "Category not found" });
    query.category = categoryDoc._id;
  }

  if (subcategory) {
    const subcategoryDoc = await Subcategory.findOne({ route: subcategory });
    if (!subcategoryDoc)
      return res.status(404).json({ message: "Subcategory not found" });
    query.subcategory = subcategoryDoc._id;
  }

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  let productsQuery = Product.find(query)
    .populate("category")
    .populate("subcategory");

  if (sort === "asc") {
    productsQuery = productsQuery.sort({ price: 1 });
  } else if (sort === "desc") {
    productsQuery = productsQuery.sort({ price: -1 });
  }

  const products = await productsQuery;

  res.status(200).json({ message: "product list", data: products });
});

exports.getProductByRoute = catchAsync(async (req, res, next) => {
  const { route } = req.params;
  const product = await Product.findOne({ route })
    .populate("category")
    .populate("subcategory");
  if (!product) {
    return next(new AppError("Product not found", 404));
  }
  res.status(200).json({ message: "product details", data: product });
});

exports.getProductsByCategory = async (req, res, next) => {
  const { categoryId } = req.params;

  const products = await Product.find({
    category: categoryId,
    isDeleted: false,
  });

  res.json({
    message: "product category list",
    data: products,
  });
};

exports.getProductsBySubcategory = async (req, res, next) => {
  const { subcategoryId } = req.params;

  const products = await Product.find({
    subcategory: subcategoryId,
    isDeleted: false,
  });

  res.json({
    message: "product subcategory list",
    data: products,
  });
};

exports.addProduct = catchAsync(async (req, res) => {
  const { title, price, description, category, subcategory, stock, route } =
    req.body;
  const image = req.file ? req.file.filename : "";
  const product = await Product.create({
    title,
    price,
    description,
    category,
    subcategory,
    stock,
    route,
    image,
  });
  res.status(201).json({ message: "product added", data: product });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { title, price, description, category, subcategory, stock, route } =
    req.body;

  const updateData = {
    title,
    price,
    description,
    category,
    subcategory,
    stock,
    route,
  };
  if (req.file) updateData.image = req.file.filename;

  const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
  })
    .populate("category")
    .populate("subcategory");

  if (!updatedProduct) return next(new AppError("Product not found", 404));

  res
    .status(200)
    .json({ message: "Product updated successfully", data: updatedProduct });
});

exports.toggleDeleteProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) return next(new AppError("Product not found", 404));

  product.isDeleted = !product.isDeleted;
  await product.save();

  res.status(200).json({ message: "Product status updated", data: product });
});
