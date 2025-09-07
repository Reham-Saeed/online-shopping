const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const AppError = require("../utils/app-error.utils");
const catchAsync = require("../utils/catch-async.utils");

exports.validateCart = catchAsync(async (req, res, next) => {
  const cart = await req.cart.populate("items.product");
  const changes = [];

  for (const cartItem of cart.items) {
    const product = cartItem.product;
    if (!product) continue;

    if (product.isDeleted || product.stock === 0) {
      changes.push({
        product: product._id,
        title: product.title,
        type: "outOfStock",
        message: `${product.title} is out of stock`,
      });
    } else {
      if (cartItem.price !== product.price) {
        changes.push({
          product: product._id,
          title: product.title,
          type: "priceChanged",
          oldPrice: cartItem.price,
          newPrice: product.price,
          message: `${product.title} price changed from ${cartItem.price} to ${product.price}`,
        });
      }
      if (cartItem.quantity > product.stock) {
        changes.push({
          product: product._id,
          title: product.title,
          type: "stockChanged",
          requestedQty: cartItem.quantity,
          availableQty: product.stock,
          message: `${product.title} only has ${product.stock} left in stock`,
        });
      }
    }
  }

  if (changes.length > 0) {
    return res.status(200).json({
      message: "Cart validation failed",
      hasChanges: true,
      changes,
    });
  }

  res.status(200).json({
    message: "Cart is valid",
    hasChanges: false,
  });
});

exports.getCart = catchAsync(async (req, res) => {
  const cart = await req.cart.populate("items.product");

  res.status(200).json({
    message: "Cart list",
    data: cart,
  });
});

exports.updateCartPrice = catchAsync(async (req, res, next) => {
  const cart = req.cart;
  const { productId, acceptNewPrice } = req.body;

  if (!productId) {
    return next(new AppError("productId is required", 400));
  }

  const item = cart.items.find((i) => i.product.toString() === productId);
  if (!item) {
    return next(new AppError("Product not found in cart", 404));
  }

  if (item.product.stock <= 0) {
    return next(new AppError("This product is out of stock", 400));
  }

  if (acceptNewPrice) {
    item.price = item.product.price;
  } else {
    cart.items.pull(item._id);
  }

  await cart.save();
  await cart.populate("items.product");

  res.status(200).json({ message: "Cart updated", data: cart });
});

exports.updateCartStock = catchAsync(async (req, res, next) => {
  const cart = req.cart;
  const { productId, acceptAvailableQty } = req.body;

  if (!productId) {
    return next(new AppError("productId is required", 400));
  }

  const item = cart.items.find((i) => i.product.toString() === productId);
  if (!item) return next(new AppError("Product not found in cart", 404));

  const product = await Product.findById(productId);
  if (!product) return next(new AppError("Product not found", 404));

  if (product.stock === 0) {
    cart.items.pull(item._id);
  } else if (item.quantity > product.stock) {
    if (acceptAvailableQty) {
      item.quantity = product.stock;
    } else {
      cart.items.pull(item._id);
    }
  }
  await cart.save();
  await cart.populate("items.product");

  res.status(200).json({ message: "Cart stock updated", data: cart });
});

exports.addToCart = catchAsync(async (req, res, next) => {
  const cart = req.cart;
  const { productId, quantity } = req.body;
  const product = await Product.findById(productId);
  if (!product || product.isDeleted) {
    return next(new AppError(`product not found`, 404));
  }

  if (product.stock <= 0) {
    return next(new AppError("This product is out of stock", 400));
  }
  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId
  );
  if (existingItem) {
    if (existingItem.quantity + quantity > product.stock) {
      return next(
        new AppError(`Only ${product.stock} items available in stock`, 400)
      );
    }
    existingItem.quantity += quantity;
  } else {
    if (quantity > product.stock) {
      return next(
        new AppError(`Only ${product.stock} items available in stock`, 400)
      );
    }
    cart.items.push({ product: productId, quantity, price: product.price });
  }
  await cart.save();
  await cart.populate("items.product");

  res.status(200).json({ message: "Product added to cart", data: cart });
});

exports.updateQuantity = catchAsync(async (req, res, next) => {
  const cart = req.cart;
  const { productId } = req.params;
  const { quantity } = req.body;
  const product = await Product.findById(productId);
  if (!product || product.isDeleted) {
    return next(new AppError(`product not found`, 404));
  }
  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId
  );
  if (!existingItem) {
    return next(new AppError(`This product is not in the cart`, 400));
  }
  if (quantity > product.stock) {
    return next(
      new AppError(`Only ${product.stock} items available in stock`, 400)
    );
  }
  existingItem.quantity = quantity;

  await cart.save();
  await cart.populate("items.product");
  res
    .status(200)
    .json({ message: "Quantity updated successfully", data: cart });
});

exports.removeFromCart = catchAsync(async (req, res, next) => {
  const cart = req.cart;
  const { productId } = req.params;
  const product = await Product.findById(productId);
  if (!product || product.isDeleted) {
    return next(new AppError(`product not found`, 404));
  }
  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (!existingItem) {
    return next(new AppError(`product not found in cart`, 404));
  }
  cart.items.pull(existingItem._id);

  await cart.save();
  await cart.populate("items.product");
  res.status(200).json({ message: "Product removed from cart", data: cart });
});

exports.clearCart = catchAsync(async (req, res) => {
  const cart = req.cart;
  cart.items = [];

  await cart.save();
  await cart.populate("items.product");

  res.status(200).json({
    message: "Cart cleared successfully",
    data: cart,
  });
});
