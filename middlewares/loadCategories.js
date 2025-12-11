const ProductCategory = require('../modules/product-category.model');
const createTreeHelper = require('../helpers/createTree');

module.exports = async (req, res, next) => {
  try {
    // load active, not-deleted categories and build tree
    const categories = await ProductCategory.find({ deleted: false, status: 'active' }).sort({ position: 1 });
    const records = createTreeHelper.tree(categories);
    // expose to templates
    res.locals.productCategories = records;
  } catch (err) {
    res.locals.productCategories = [];
    console.error('loadCategories middleware error:', err.message);
  }
  next();
};
