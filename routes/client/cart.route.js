const express = require('express');
const route = express.Router();
const Controller = require('../../controllers/client/cartController');

route.post('/add/:productId',Controller.add);
route.get('/',Controller.index);


module.exports = route;