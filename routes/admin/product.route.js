const express = require("express");
const multer = require("multer");
// const storageMulter = require('../../helpers/upload');

const upload = multer();
const route = express.Router();
const controller = require("../../controllers/admin/productsController");
const validate = require("../../validate/admin/product.validate");
const uploadToCloudinary = require("../../middlewares/admin/uploadCloud");
// Configuration


route.get("/", controller.index);

route.patch("/change-status/:status/:id", controller.changeStatus);

route.patch("/change-multi", controller.changeMulti);

route.delete("/delete/:id", controller.delete);

route.get("/create", controller.createProduct);

route.post(
  "/create",
  upload.single("thumbnail"),
  uploadToCloudinary.uploadCloud,
  validate.createPost,
  controller.createPost
);

route.get("/edit/:id", controller.editProduct);

route.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  uploadToCloudinary.uploadCloud,
  validate.createPost,
  controller.editPatch
);

route.get("/detail/:id", controller.detail);

module.exports = route;
