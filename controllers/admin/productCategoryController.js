const ProductCategory = require("../../modules/product-category.model");
const filterStatusHelper = require("../../helpers/filterStatus.js");
const ObjectSearch = require("../../helpers/search.js");
const pagination = require("../../helpers/pagnition.js");
const createTreeHelper = require("../../helpers/createTree.js");

module.exports.index = async (req, res) => {
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
  const countProduct = await ProductCategory.countDocuments(find);

  let Pages = pagination(
    {
      limits: 4,
      currentPage: 1,
    },
    req.query,
    countProduct
  );


  const productCategories = await ProductCategory.find(find)
    .sort({ position: "desc" })
    .limit(Pages.limits)
    .skip(Pages.skip);
  const records = createTreeHelper.tree(productCategories);
  res.render("admin/pages/product-category/index", {
    pageTitle: "Danh mục sản phẩm",
    messages: req.flash(),
    productCategory: productCategories,
    filterStatus: filterStatus,
    keyword: Search.keyword,
    Pages: Pages,
    records: records,
  });
};

module.exports.create = async (req, res) => {

  // load existing categories so user can pick a parent category
  const productCategories = await ProductCategory.find({ deleted: false }).sort(
    { position: "desc" }
  );
  const records = createTreeHelper.tree(productCategories);
  console.log(records);
  res.render("admin/pages/product-category/create", {
    pageTitle: "Tạo danh mục sản phẩm",
    messages: req.flash(),
    productCategory: productCategories,
    records: records,
  });
};

module.exports.createPost = async (req, res) => {
  console.log(req.body);
  if (req.body.position == "") {
    const countProduct = await ProductCategory.countDocuments({});
    req.body.position = countProduct + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  const productCategory = new ProductCategory(req.body);
  await productCategory.save();
  req.flash("success", "Tạo danh mục sản phẩm thành công");
  res.redirect("/admin/product-category");
};

module.exports.changeStatus = async (req, res) => {
  const id = req.params.id;
  const status = req.params.status;
  await ProductCategory.updateOne({ _id: id }, { status: status });
  req.flash("success", "Cập nhật trạng thái thành công");

  res.redirect(req.get("Referer") || "/admin/product-category");
};

module.exports.changeMulti = async (req, res) => {
  console.log(req.body);
  const type = req.body.type;
  const ids = req.body.ids.split(",");
  console.log(type);
  console.log(ids);
  switch (type) {
    case "inactive":
      await ProductCategory.updateMany(
        { _id: { $in: ids } },
        { status: "inactive" }
      );
      break;
    case "active":
      await ProductCategory.updateMany(
        { _id: { $in: ids } },
        { status: "active" }
      );
      break;
    case "delete-all":
      await ProductCategory.updateMany(
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
        await ProductCategory.updateOne({ _id: id }, { position: position });
      }
  }

  req.flash("success", "Cập nhật thành công");
  res.redirect(req.get("Referer") || "/admin/product-category");
};

module.exports.delete = async (req, res) => {
  const id = req.params.id;
  await ProductCategory.updateOne(
    { _id: id },
    { deleted: true, deleteAt: Date.now() }
  );
  res.redirect(req.get("Referer") || "/admin/product-category");
};

module.exports.editProduct = async (req, res) => {
  const id = req.params.id;
  const find = { _id: id, deleted: false };

  const productCategories = await ProductCategory.find({ deleted: false }).sort(
    { position: "desc" }
  );

  const records = createTreeHelper.tree(productCategories)

  const product = await ProductCategory.findOne(find);
  res.render("admin/pages/product-category/edit", {
    pageTitle: "Edit Product",
    product: product,
    productCategory: productCategories,
    records: records
  });
};

module.exports.editPatch = async (req, res) => {
  console.log(req.body);
  req.body.price = parseFloat(req.body.price);
  req.body.discountPercentage = parseFloat(req.body.discountPercentage) || 0;
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);

  try {
    await ProductCategory.updateOne({ _id: req.params.id }, req.body);
    req.flash("success", "Cập nhật thành công");
    res.redirect("/admin/product-category");
  } catch (error) {
    req.flash("error", "Cập nhật thất bại");
    res.redirect(`/admin/product-category/edit/${req.params.id}`);
  }
};

module.exports.detail = async (req, res) => {
  const find = { _id: req.params.id, deleted: false };
  const product = await ProductCategory.findOne(find);
  res.render("admin/pages/product-category/detail", {
    pageTitle: "Product Category Detail",
    product: product,
  });
};
