const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  product_category_id: { type: String, default: "" },
  slug: { type: String, slug: "title", unique: true },
  description: { type: String, default: "" },
  price: { type: Number, required: true },
  thumbnail: { type: String },
  discountPercentage: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  position: { type: Number, default: 0 },
  featured:{ type: String },
  deleted: { type: Boolean, default: false },
  createBy: {
    account_id: String,
    createdAt: { type: Date, default: Date.now },
  },
  updatedBy: [
    {
      account_id: String,
      updatedAt: { type: Date, default: Date },
    },
  ],
  deleteBy: {
    account_id: String,
    deletedAt: { type: Date, default: Date },
  },
});

// Correct model creation and export
const Product = mongoose.model("Product", productSchema, "product");
module.exports = Product;
