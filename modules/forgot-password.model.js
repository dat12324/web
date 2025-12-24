const e = require("express");
const mongoose = require("mongoose");
const forgotPasswordSchema = new mongoose.Schema(
  {
   
    otp: { type: String, },
    email: { type: String, required: true, unique: true },
    expireAt: { type: Date, expires: 180, default: Date.now},
  },
  
  { timestamps: true }
);

// Correct model creation and export
const ForgotPassword = mongoose.model("ForgotPassword", forgotPasswordSchema, "forgot-password");
module.exports = ForgotPassword;