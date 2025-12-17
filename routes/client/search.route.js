const express = require('express');
const route = express.Router();
const searchController = require('../../controllers/client/searchController');
route.get('/',searchController.index);
module.exports = route;