const createTreeHelper = require("../../helpers/createTree.js");
const ProductCategory = require("../../modules/product-category.model");

module.exports.category = async (req, res, next) => {
  const records = await ProductCategory.find({ deleted: false });
  const newRecord = createTreeHelper.tree(records);
  res.locals.newCategory = newRecord;
  next();
};
