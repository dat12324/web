const productRoute = require('./product.route');
const categoryMiddleware = require('../../middlewares/client/category.middleware.js');
const homeRoute = require('./home.route');
module.exports = (app) => {
  app.use(categoryMiddleware.category);
  app.use('/',homeRoute);
  app.use('/products',productRoute);
};