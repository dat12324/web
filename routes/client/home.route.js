const express = require('express');
const route = express.Router();
const homeController = require('../../controllers/client/homeController');
route.get('/',homeController.index);
module.exports = route;