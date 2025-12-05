const Account = require("../../modules/account.model");
const md5 = require("md5");
const Role = require("../../modules/role.model");

module.exports.index = async (req, res) => {
  const accounts = await Account.find({ deleted: false })
    .sort({
      createdAt: -1,
    })
    .select("-password -token");
  for (account of accounts) {
    const role = await Role.findOne({
      _id: account.role_id,
      deleted: false,
    });
    account.role = role;
  }
  res.render("admin/pages/account/index", {
    pageTitle: "account Management",
    message: "Welcome to the Home Page",
    accounts,
  });
};

module.exports.create = async (req, res) => {
  const roles = await Role.find({ deleted: false });
  res.render("admin/pages/account/create", {
    pageTitle: "account Management",
    roles,
  });
};

module.exports.createPost = async (req, res) => {
  try {
    const emailExists = await Account.findOne(
      { email: req.body.email },
      {
        deleted: false,
      }
    );
    if (emailExists) {
      req.flash("error", "Email đã tồn tại");
      return res.redirect("/admin/accounts/create");
    } else {
      req.body.password = md5(req.body.password);
      const account = new Account(req.body);
      await account.save();
      req.flash("success", "Tạo tài khoản thành công");
      res.redirect(req.get("Referer") || "/admin/accounts");
    }
  } catch (err) {
    console.error(err);
    req.flash("error", "Tạo tài khoản thất bại");
    res.redirect("/admin/accounts/create");
  }
};

module.exports.edit = async (req, res) => {
  const data = await Account.findOne({ _id: req.params.id, deleted: false });
  const roles = await Role.find({ deleted: false });
  res.render("admin/pages/account/edit", {
    pageTitle: "Edit account",
    data: data,
    roles,
  });
};

module.exports.editPatch = async (req, res) => {
  try {
    const emailExists = await Account.findOne({
      _id: { $ne: req.params.id },
      email: req.body.email,
      deleted: false,
    });
    if (emailExists) {
      req.flash("error", "Email đã tồn tại");
    } else {
      if (req.body.password) {
        req.body.password = md5(req.body.password);
      } else {
        delete req.body.password;
      }
      await Account.updateOne({ _id: req.params.id }, req.body);
      req.flash("success", "Cập nhật tài khoản thành công");
    }
    res.redirect("/admin/accounts");
  } catch (error) {
    req.flash("error", "Cập nhật tài khoản thất bại");
    res.redirect(`/admin/accounts/edit/${req.params.id}`);
  }
};

module.exports.delete = async (req, res) => {
  const id = req.params.id;
  await Account.updateOne({ _id: id }, { deleted: true, deleteAt: Date.now() });
  res.redirect(req.get("Referer") || "/admin/accounts");
};
