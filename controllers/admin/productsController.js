const e = require("express");
const Product = require("../../modules/product.model");
const ProductCategory = require("../../modules/product-category.model");
const filterStatusHelper = require("../../helpers/filterStatus.js");
const ObjectSearch = require("../../helpers/search.js");
const pagination = require("../../helpers/pagnition.js");
const createTreeHelper = require("../../helpers/createTree.js");
module.exports.index = async (req, res) => {
  // Logic to fetch products from the database
  const filterStatus = filterStatusHelper(req.query);

  let find = {
    deleted: false,
  };
  if (req.query.status) {
    find.status = req.query.status;
  }

  const Search = ObjectSearch(req.query);
  if (Search.regex) {
    find.title = Search.regex;
  }
  const countProduct = await Product.countDocuments(find);

  let Pages = pagination(
    {
      limits: 4,
      currentPage: 1,
    },
    req.query,
    countProduct
  );

  let sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  } else {
    sort.position = "desc";
  }
  
  const products = await Product.find(find)
    .sort(sort)
    .limit(Pages.limits)
    .skip(Pages.skip);

  res.render("admin/pages/product/index", {
    pageTitle: "Products",
    products: products,
    filterStatus: filterStatus,
    keyword: Search.keyword,
    Pages: Pages,
    messages: req.flash(),
  });
};

module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  await Product.updateOne({ _id: id }, { status: status });

  req.flash("success", "Cập nhật trạng thái thành công");

  res.redirect(req.get("Referer") || "/admin/products");
};

module.exports.changeMulti = async (req, res) => {
  console.log(req.body);
  const type = req.body.type;
  const ids = req.body.ids.split(",");
  console.log(type);
  console.log(ids);
  switch (type) {
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      break;
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      break;
    case "delete-all":
      await Product.updateMany(
        { _id: { $in: ids } },
        {
          deleted: true,
          deleteAt: Date.now(),
        }
      );
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        await Product.updateOne({ _id: id }, { position: position });
      }
  }

  req.flash("success", "Cập nhật thành công");
  res.redirect(req.get("Referer") || "/admin/products");
};

module.exports.delete = async (req, res) => {
  const id = req.params.id;
  await Product.updateOne({ _id: id }, { deleted: true, deleteAt: Date.now() });
  res.redirect(req.get("Referer") || "/admin/products");
};

module.exports.createProduct = async (req, res) => {
  const records = await ProductCategory.find({ deleted: false }).sort({ position: "desc" });
  const newRecords = createTreeHelper.tree(records);
  
  res.render("admin/pages/product/create", {
    pageTitle: "Create Product",
    Category : newRecords,
  });
};

module.exports.createPost = async (req, res) => {
  req.body.price = parseFloat(req.body.price);
  req.body.discountPercentage = parseFloat(req.body.discountPercentage) || 0;
  req.body.stock = parseInt(req.body.stock);
  if (req.body.position == "") {
    const countProduct = await Product.countDocuments({});
    req.body.position = countProduct + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  const product = new Product(req.body);
  await product.save();

  req.flash("success", "Tạo sản phẩm thành công");
  res.redirect("/admin/products/create");
};

module.exports.editProduct = async (req, res) => {
  const id = req.params.id;
  const find = { _id: id, deleted: false };
  const records = await ProductCategory.find({ deleted: false }).sort({ position: "desc" });

  const product = await Product.findOne(find);
  const newRecords = createTreeHelper.tree(records);

  res.render("admin/pages/product/edit", {
    pageTitle: "Edit Product",
    product: product,
    Category : newRecords,
  });
};
module.exports.editPatch = async (req, res) => {
  console.log(req.body);
  req.body.price = parseFloat(req.body.price);
  req.body.discountPercentage = parseFloat(req.body.discountPercentage) || 0;
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);

  try {
    await Product.updateOne({ _id: req.params.id }, req.body);
    req.flash("success", "Cập nhật sản phẩm thành công");
    res.redirect("/admin/products");
  } catch (error) {
    req.flash("error", "Cập nhật sản phẩm thất bại");
    res.redirect(`/admin/products/edit/${req.params.id}`);
  }
};

module.exports.detail = async (req, res) => {
  const find = { _id: req.params.id, deleted: false };
  const product = await Product.findOne(find);
  res.render("admin/pages/product/detail", {
    pageTitle: "Product Detail",
    product: product,
  });
};
