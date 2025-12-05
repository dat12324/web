const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const roleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    permissions: { type: Array, default: ["them san pham","xoa san pham"] },
    slug: { type: String, slug: "title", unique: true },
    description: { type: String, default: "" },
    deleted: { type: Boolean, default: false },
    deleteAt: { type: Date },
  },
  { timestamps: true }
);

// Correct model creation and export
const Role = mongoose.model("Role", roleSchema, "roles");
module.exports = Role;
