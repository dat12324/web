const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    cart_id: {
      type: String,
    },
    userInfo: {
      fullName: String,
      phone: String,
      address: String,
    },
    products: [
      {
        product_id: String,
        quantity: Number,
        price: Number,
        discountPercentage: Number,
      },
    ],

    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },

  { timestamps: true }
);

// Correct model creation and export
const Order = mongoose.model("Order", orderSchema, "orders");
module.exports = Order;
