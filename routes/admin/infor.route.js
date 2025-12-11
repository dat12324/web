const express = require('express');
const route = express.Router();
const controller = require('../../controllers/admin/inforController');
const multer = require('multer');
// const storageMulter = require('../../helpers/upload');
const validate = require('../../validate/admin/account.validate');
const upload = multer();
const uploadToCloudinary = require('../../middlewares/admin/uploadCloud');
route.get('/', controller.index);
route.get('/edit', controller.edit);

route.patch(
  "/edit",
  upload.single("avatar"),
  uploadToCloudinary.uploadCloud,
  validate.createPost,
  controller.editPatch
);

module.exports = route;
