const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const productCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    parent_id: {
      type: String,
      default: "",
    },
    slug: {
      type: String,
      slug: "title",
      unique: true,
    },
    description: {
      type: String,
      default: "",
    },
    thumbnail: { type: String },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    position: {
      type: Number,
      default: 0,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deleteAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Correct model creation and export
const ProductCategory = mongoose.model(
  "ProductCategory",
  productCategorySchema,
  "product-category"
);
module.exports = ProductCategory;
