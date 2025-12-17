const ProductCategory = require("../modules/product-category.model");

module.exports.getSubCategories = async (parentId) => {
  const getCategory = async (parentId) => {
    const sub = await ProductCategory.find({
      parent_id: parentId,
      status: "active",
      deleted: false,
    });
    let allSubs = [...sub];
    for (const s of sub) {
      const childSubs = await getCategory(s.id);
      allSubs = allSubs.concat(childSubs);
    }
    return allSubs;
  };
  const categories = await getCategory(parentId);
  return categories;
};
