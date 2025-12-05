const express = require("express");
const route = express.Router();
const multer = require("multer");
const controller = require("../../controllers/admin/authController");
// const storageMulter = require('../../helpers/upload');
const validate = require("../../validate/admin/auth.validate");
route.get("/login", controller.index);
route.post("/login",validate.loginPost,
     controller.login);
route.get("/logout", controller.logout);


// show create form
// route.get("/create", controller.create);

// route.post(
//   "/create",
//   upload.single("avatar"),
//   uploadToCloudinary.uploadCloud,
//   validate.createPost,
//   controller.createPost
// );

// route.get("/edit/:id", controller.edit);

// route.patch(
//   "/edit/:id",
//   upload.single("avatar"),
//   uploadToCloudinary.uploadCloud,
//   validate.createPost,
//   controller.editPatch
// );

// route.delete("/delete/:id", controller.delete);

// TODO: add POST handler for creating auths: route.post('/create', controller.createPost);

module.exports = route;
