const mongoose = require("mongoose");
const generate = require("../helpers/random");
const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    tokenUser: { type: String, default: generate.randomString(20) },
    avatar: { type: String, default: "" },
    phone: { type: String, default: "" },
    status: { 
        type: String,
        default: "active"
    },
    deleted: { type: Boolean, default: false },
    deleteAt: { type: Date },
  },
  { timestamps: true }
);

// Correct model creation and export
const User = mongoose.model("User", userSchema, "users");
module.exports = User;
