const Role = require("../../modules/role.model");

module.exports.index = async (req, res) => {
  const roles = await Role.find({ deleted: false }).sort({ createdAt: -1 });
  res.render("admin/pages/role/index", {
    pageTitle: "Role Management",
    message: "Welcome to the Home Page",
    roles,
  });
};

module.exports.create = (req, res) => {
  res.render("admin/pages/role/create", {
    pageTitle: "Create Role",
    message: "Create a new role here",
  });
};

module.exports.createPost = async (req, res) => {
  try {
    const role = new Role(req.body);
    await role.save();
    req.flash("success", "Tạo vai trò thành công");
    res.redirect(req.get("Referer") || "/admin/roles");
  } catch (err) {
    console.error(err);
    req.flash("error", "Tạo vai trò thất bại");
    res.redirect("/admin/roles/create");
  }
};

module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const role = await Role.findOne({ _id: id, deleted: false });
    if (!role) {
      req.flash("error", "Vai trò không tồn tại");
      return res.redirect(req.get("Referer") || "/admin/roles");
    }
    res.render("admin/pages/role/edit", {
      pageTitle: "Sửa vai trò",
      role,
    });
  } catch (err) {
    console.error(err);
    req.flash("error", "Lỗi khi tải vai trò");
    res.redirect(req.get("Referer") || "/admin/roles");
  }
};

module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, permissions, description } = req.body;
    const perms =
      typeof permissions === "string" && permissions.trim() !== ""
        ? permissions.split(",").map((p) => p.trim())
        : [];
    await Role.updateOne(
      { _id: id },
      { title, permissions: perms, description }
    );
    req.flash("success", "Cập nhật vai trò thành công");
    res.redirect(req.get("Referer") || "/admin/roles");
  } catch (err) {
    console.error(err);
    req.flash("error", "Cập nhật vai trò thất bại");
    res.redirect(req.get("Referer") || "/admin/roles");
  }
};

module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await Role.updateOne({ _id: id }, { deleted: true, deleteAt: Date.now() });
    req.flash("success", "Xóa vai trò thành công");
    res.redirect(req.get("Referer") || "/admin/roles");
  } catch (err) {
    console.error(err);
    req.flash("error", "Xóa vai trò thất bại");
    res.redirect(req.get("Referer") || "/admin/roles");
  }
};

module.exports.permissions = async (req, res) => {
  const records = await Role.find({ deleted: false });
  res.render("admin/pages/role/permission", {
    pageTitle: "Quản trị viên",
    records: records,
  });
};

module.exports.permissionsPatch = async (req, res) => {
  const permissions = JSON.parse(req.body.permissions);
  for (const item of permissions) {
    await Role.updateOne({ _id: item.id }, { permissions: item.permissions });
  }
    req.flash("success", "Cập nhật quyền thành công");
    res.redirect(req.get("Referer") || "/admin/roles/permission");
};
