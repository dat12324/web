const express = require("express");
const multer = require("multer");
const route = express.Router();
const controller = require("../../controllers/admin/settingController");
const upload = multer()
const uploadToCloudinary = require("../../middlewares/admin/uploadCloud");

// Configuration


route.get("/general", controller.general);
route.patch("/general",upload.single("logo")
    ,uploadToCloudinary.uploadCloud, controller.generalPost);




module.exports = route;

