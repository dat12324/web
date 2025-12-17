const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const cartSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
    },
    products: [{ product_id: String, quantity: Number },
      ],
    
  },
  { timestamps: true }
);

// Correct model creation and export
const Cart = mongoose.model("Cart", cartSchema, "carts");
module.exports = Cart;
