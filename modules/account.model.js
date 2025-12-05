const mongoose = require("mongoose");
const generate = require("../helpers/random");
const accountSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    token: { type: String, default: generate.randomString(20) },
    avatar: { type: String, default: "" },
    phone: { type: String, default: "" },
    role_id: { type: String,},
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    deleted: { type: Boolean, default: false },
    deleteAt: { type: Date },
  },
  { timestamps: true }
);

// Correct model creation and export
const Account = mongoose.model("Account", accountSchema, "account");
module.exports = Account;
