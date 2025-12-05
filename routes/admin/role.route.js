const express = require("express");
const multer = require("multer");
const route = express.Router();
const controller = require("../../controllers/admin/roleController");

// Configuration


route.get("/", controller.index);
route.get("/create", controller.create);
route.post("/create", controller.createPost);
route.get("/edit/:id", controller.edit);
route.patch("/edit/:id", controller.editPatch);
route.delete("/delete/:id", controller.delete);
route.get("/permission", controller.permissions);
route.patch("/permission", controller.permissionsPatch);




module.exports = route;

