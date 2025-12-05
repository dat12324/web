const express = require("express");
const route = express.Router();
const controller = require("../../controllers/admin/accountController");
const multer = require("multer");
// const storageMulter = require('../../helpers/upload');
const validate = require("../../validate/admin/account.validate");
const upload = multer();
const uploadToCloudinary = require("../../middlewares/admin/uploadCloud");
route.get("/", controller.index);
// show create form
route.get("/create", controller.create);

route.post(
  "/create",
  upload.single("avatar"),
  uploadToCloudinary.uploadCloud,
  validate.createPost,
  controller.createPost
);

route.get("/edit/:id", controller.edit);

route.patch(
  "/edit/:id",
  upload.single("avatar"),
  uploadToCloudinary.uploadCloud,
  validate.createPost,
  controller.editPatch
);

route.delete("/delete/:id", controller.delete);

// TODO: add POST handler for creating accounts: route.post('/create', controller.createPost);

module.exports = route;
