const express = require('express');
const route = express.Router();
const Controller = require('../../controllers/client/checkoutController');

route.get('/',Controller.index);
route.get('/success/:orderId',Controller.success);
route.post('/order',Controller.order);



module.exports = route;