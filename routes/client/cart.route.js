const express = require('express');
const route = express.Router();
const Controller = require('../../controllers/client/cartController');

route.post('/add/:productId',Controller.add);
route.get('/',Controller.index);
route.get('/delete/:productId',Controller.deleted);
route.get('/update/:productId/:quantity',Controller.updated);


module.exports = route;