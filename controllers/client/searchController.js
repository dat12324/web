const Product = require("../../modules/product.model");
const searchHelper = require("../../helpers/search.js");
const productHelper = require("../../helpers/product.js");
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  const Search = searchHelper(req.query);
  if (Search.regex) {
    find.title = Search.regex;
  }
  const products = await Product.find(find).sort({ position: "desc" });
  const newProducts = productHelper.productNewPrice(products);
  res.render("client/pages/search/index", {
    pageTitle: "Kết quả tìm kiếm",
    products: newProducts,
  });
};
