const Cart = require("../models/cart.model");
const catchAsync = require("../utils/catch-async.utils");
const { v4: uuidv4 } = require("uuid");

exports.loadCart = catchAsync(async (req, res, next) => {
   let cart;
  let sessionId = req.cookies.sessionId;

  if (req.user) {
    if (sessionId) {
      const guestCart = await Cart.findOne({ sessionId });
      if (guestCart) {
        guestCart.sessionId = req.user._id.toString();
        await guestCart.save();
        cart = guestCart;
      }
    }
    if (!cart) {
      cart = await Cart.findOne({ sessionId: req.user._id.toString() });
      if (!cart) {
        cart = await Cart.create({ sessionId: req.user._id.toString(), items: [] });
      }
    }
  } else {
    if (!sessionId) {
      sessionId = uuidv4();
      res.cookie("sessionId", sessionId, { httpOnly: true });
    }
    cart = await Cart.findOne({ sessionId });
    if (!cart) {
      cart = await Cart.create({ sessionId, items: [] });
    }
  }

  req.cart = cart;
  next();
});
