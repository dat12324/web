const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const settingSchema = new mongoose.Schema(
  {
    websiteName: { type: String, default: "My Website" },
    logo: { type: String, default: "/images/logo.png" },
    email: { type: String, default: ""},
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    copyright: { type: String, default: "" },


  },
  { timestamps: true }
);

// Correct model creation and export
const Setting = mongoose.model("Setting", settingSchema, "setting");
module.exports = Setting;