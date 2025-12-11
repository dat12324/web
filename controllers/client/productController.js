// Require the correct model file (modules/product.model.js)
const Product = require("../../modules/product.model");
const productHelper = require("../../helpers/product.js");
const ProductCategory = require("../../modules/product-category.model");

module.exports.index = async (req, res) => {
  console.log;
  let find = {
    deleted: false,
  };
  if (req.query.status) {
    find.status = req.query.status;
  }
  const products = await Product.find(find).sort({ position: "desc" });
  const newProducts = productHelper.productNewPrice(products);
  console.log(newProducts.priceNew);
  res.render("client/pages/products/index", {
    pageTitle: "Products Page",
    products: newProducts,
  });
};

module.exports.detail = async (req, res) => {
  const find = {
    slug: req.params.slug,
    deleted: false,
    status: "active",
  };

  const product = await Product.findOne(find);
  if (!product) {
    return res.status(404).send("Product not found");
  }
  res.render("client/pages/products/detail", {
    pageTitle: product.title,
    product: product,
  });
};

module.exports.category = async (req, res) => {
  const category = await ProductCategory.findOne({
    slug: req.params.slugCategory,
    deleted: false,
  });

  const getSubCategories = async (parentId) => {
    const sub = await ProductCategory.find({
      parent_id: parentId,
      status: "active",
      deleted: false,
    });
    let allSubs = [...sub] ;
    for (const s of sub) {
      const childSubs = await getSubCategories(s.id);
      allSubs = allSubs.concat(childSubs);
    }
    return allSubs;
  };
  const  list = await getSubCategories(category.id);
  const listIds = list.map(cat => cat.id);
  console.log(listIds);

  const products = await Product.find({
    product_category_id: { $in:[category.id, ...listIds ]},
    deleted: false,
  }).sort({ position: "desc" });
  const newProducts = productHelper.productNewPrice(products);
  res.render("client/pages/products/index", {
    pageTitle: category.title,
    products: newProducts,
  });
};
