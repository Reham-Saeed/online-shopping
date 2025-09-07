const Order = require("../models/order.model");
const Product = require("../models/product.model");
const catchAsync = require("../utils/catch-async.utils");
const AppError = require("../utils/app-error.utils");

exports.createOrder = catchAsync(async (req, res, next) => {
  const cart = req.cart;

  if (!cart || cart.items.length === 0) {
    return next(new AppError("Cart is empty", 400));
  }

  for (const item of cart.items) {
    const product = await Product.findOne({
      _id: item.product,
      isDeleted: false,
    });

    if (!product) {
      return next(new AppError(`Product not found`, 404));
    }

    if (product.stock < item.quantity) {
      return next(
        new AppError(`Not enough stock for product ${product.title}`, 400)
      );
    }

    product.stock -= item.quantity;
    await product.save();
  }

// خدي نسخة من الـ items
const orderItems = cart.items.map(item => ({
  product: item.product,
  quantity: item.quantity,
  price: item.price,
  subtotal: item.subtotal,
}));

// اعملي order بالنسخة دي
const order = await Order.create({
  user: req.user._id,
  items: orderItems,
  totalPrice: cart.totalPrice,
});

// بعد كده فرغي الـ cart
cart.items = [];
cart.totalPrice = 0;
await cart.save();


  res.status(201).json({
    message: "Order created successfully",
    data: order,
  });
});

exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .populate("items.product", "title price");

  if (!orders || orders.length === 0) {
    return next(new AppError("No orders found", 404));
  }

  res.status(200).json({
    message: "Orders fetched successfully",
    results: orders.length,
    data: orders,
  });
});

exports.getUserOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id })
    .populate("items.product", "title ")
     .populate("user", "name email phone address")
    .sort({ createdAt: -1 });

  if (!orders || orders.length === 0) {
    return next(new AppError("No orders found for this user", 404));
  }

  res.status(200).json({
    message: "User orders fetched successfully",
    results: orders.length,
    data: orders,
  });
});

exports.updateOrderStatus = catchAsync(async (req, res, next) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const order = await Order.findById(orderId).populate("items.product");

  if (!order) {
    return next(new AppError("Order not found", 404));
  }

  if (order.status === "cancelled" || order.status === "rejected") {
    return next(
      new AppError(
        "This order is already cancelled/rejected and cannot be updated",
        400
      )
    );
  }

  order.status = status;
  await order.save();

  res.status(200).json({
    message: "Order status updated successfully",
    data: order,
  });
});
