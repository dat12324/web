const Account = require('../../modules/account.model');
const Role = require('../../modules/role.model');
const md5 = require('md5');

module.exports.index = async (req, res) => {
  try {
    const user = await Account.findOne({ _id: res.locals.user.id });
    if (user && user.role_id) {
      const role = await Role.findOne({ _id: user.role_id });
      if (role) user.roleName = role.title;
    }

    res.render('admin/pages/infor/index', {
      pageTitle: 'Thông tin cá nhân',
      user: user,
      messages: req.flash(),
    });
  } catch (error) {
    console.error(error);
    req.flash('error', 'Không thể tải thông tin người dùng');
    res.redirect(req.get('Referer') || '/admin/dashboard');
  }
};

module.exports.edit = async (req, res) => {
  try {
    res.render('admin/pages/infor/edit', {
      pageTitle: 'Chỉnh sửa thông tin',
      messages: req.flash(),
    });
  } catch (error) {
    console.error(error);
    req.flash('error', 'Không thể tải trang chỉnh sửa');
    res.redirect(req.get('Referer') || '/admin/infor');
  }
};

module.exports.editPatch = async (req, res) => {
 try {
    const emailExists = await Account.findOne({
      _id: { $ne: res.locals.user.id },
      email: req.body.email,
      deleted: false,
    });
    if (emailExists) {
      req.flash("error", "Email đã tồn tại");
      res.redirect(`/admin/infor/edit`);
    } else {
      if (req.body.password) {
        req.body.password = md5(req.body.password);
      } else {
        delete req.body.password;
      }
      await Account.updateOne({ _id: res.locals.user.id }, req.body);
      req.flash("success", "Cập nhật tài khoản thành công");
    }
    res.redirect("/admin/infor");
  } catch (error) {
    console.error(error);
    req.flash("error", "Cập nhật tài khoản thất bại");
    res.redirect(`/admin/infor/edit`);
  }
};


