const productRoute = require('./product.route');
const categoryMiddleware = require('../../middlewares/client/category.middleware.js');
const homeRoute = require('./home.route');
const searchRoute = require('./search.route');
const cartRoute = require('./cart.route');
const cartMiddleware = require('../../middlewares/client/cart.middleware.js');
module.exports = (app) => {
  app.use(categoryMiddleware.category);
  app.use(cartMiddleware.cartId);
  app.use('/cart',cartRoute);
  app.use('/',homeRoute);
  app.use('/products',productRoute);
  app.use('/search',searchRoute);
};