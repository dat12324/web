const express = require("express");
const multer = require("multer");
const upload = multer();
const validate = require("../../validate/admin/productCategory.validate");
const uploadToCloudinary = require("../../middlewares/admin/uploadCloud");

const route = express.Router();
const controller = require("../../controllers/admin/productCategoryController");

// Configuration


route.get("/", controller.index);

route.get("/create", controller.create);

route.patch("/change-status/:status/:id", controller.changeStatus);

route.patch("/change-multi", controller.changeMulti);

route.delete("/delete/:id", controller.delete);

route.get("/detail/:id", controller.detail);


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


module.exports = route;
