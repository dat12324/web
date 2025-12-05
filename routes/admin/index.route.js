const dashboard = require('./dashboard.route');
const productRoute = require('./product.route');
const systemCongig = require('../../config/system');
const productCategoryRoute = require('./product-category.route');
const roleRoute = require('./role.route');
const accountRoute = require('./account.route');
const authRoute = require('./auth.route');
const authMiddleware = require('../../middlewares/admin/auth.middleware');
module.exports = (app) => {
  const preFixAdmin = systemCongig.preFixAdmin;
  app.use(preFixAdmin+'/dashboard',authMiddleware.requireAuth ,
    dashboard);
  app.use(preFixAdmin+'/products',authMiddleware.requireAuth ,
    productRoute);
  app.use(preFixAdmin+'/product-category',authMiddleware.requireAuth ,
    productCategoryRoute);
  app.use(preFixAdmin+'/roles',authMiddleware.requireAuth ,
    roleRoute);
  app.use(preFixAdmin+'/accounts',authMiddleware.requireAuth ,
    accountRoute);
  app.use(preFixAdmin+'/auth',authRoute);

};