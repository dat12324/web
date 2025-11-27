const dashboard = require('./dashboard.route');
const productRoute = require('./product.route');
const systemCongig = require('../../config/system');
const productCategoryRoute = require('./product-category.route');

module.exports = (app) => {
  const preFixAdmin = systemCongig.preFixAdmin;
  app.use(preFixAdmin+'/dashboard',dashboard);
  app.use(preFixAdmin+'/products',productRoute);
  app.use(preFixAdmin+'/product-category',productCategoryRoute);
};