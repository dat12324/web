const md5 = require("md5");
const Account = require("../../modules/account.model");
module.exports.index = (req, res) => {
  if (req.cookies.token) {
    res.redirect("/admin/dashboard");
  } else {
    res.render("admin/pages/login/index", {
      pageTitle: "Admin Login",
      messages: req.flash(),
    });
  }
};
module.exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = md5(password);

  const user = await Account.findOne({
    email: email,
    deleted: false,
  });

  if (user) {
    if (user.password !== hashedPassword) {
      req.flash("error", "mật khẩu không đúng");
      return res.redirect("/admin/auth/login");
    }
    if (user.status === "inactive") {
      req.flash("error", "Tài khoản của bạn đã bị vô hiệu hóa");
      return res.redirect("/admin/auth/login");
    } else {
      req.flash("success", "Đăng nhập thành công");
      res.cookie("token", user.token);
      res.redirect("/admin/dashboard");
    }
  } else {
    req.flash("error", "Email hoặc mật khẩu không đúng");
    res.redirect("/admin/auth/login");
  }
};

module.exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/admin/auth/login");
};
