const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
        },
        subtotal: {
          type: Number,
        },
      },
    ],
    totalPrice: {
      type: Number,
    },
  },
  { timestamps: true }
);

cartSchema.pre("save", async function (next) {
  this.items.forEach((item) => {
    item.subtotal = item.price * item.quantity;
  });
  this.totalPrice = this.items.reduce((acc, item) => acc + item.subtotal, 0);
  next();
});

module.exports = mongoose.model("Cart", cartSchema);
