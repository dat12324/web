const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, slug: "title", unique: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    thumbnail: { type: String },
    discountPercentage: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    position: { type: Number, default: 0 },
    deleted: { type: Boolean, default: false },
    deleteAt: { type: Date },
  },
  { timestamps: true }
);

// Correct model creation and export
const Product = mongoose.model("Product", productSchema, "product");
module.exports = Product;
