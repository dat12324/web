const User = require("../../modules/user.model.js");
const md5 = require("md5");
const ForgotPassword = require("../../modules/forgot-password.model.js");
const generate = require("../../helpers/random.js");
const sendEmailHelper = require("../../helpers/sendEmail.js");
module.exports.register = (req, res) => {
  res.render("client/pages/user/register", {
    pageTitle: "Đăng ký tài khoản",
  });
};
module.exports.registerPost = async (req, res) => {
  const existingEmail = await User.findOne({ email: req.body.email });
  if (existingEmail) {
    req.flash("error", "Email đã được sử dụng");
    res.redirect("/user/register");
    return;
  }
  req.body.password = md5(req.body.password);
  const user = new User(req.body);
  await user.save();
  res.cookie("tokenUser", user.tokenUser, { maxAge: 30 * 24 * 60 * 60 * 1000 });
  req.flash("success", "Đăng ký tài khoản thành công");
  res.redirect("/");
};

module.exports.login = (req, res) => {
  res.render("client/pages/user/login", {
    pageTitle: "Đăng nhập tài khoản",
  });
};
module.exports.loginPost = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    req.flash("error", "Email không tồn tại");
    res.redirect("/user/login");
    return;
  }
  if (md5(req.body.password) !== user.password) {
    req.flash("error", "Mật khẩu không đúng");
    res.redirect("/user/login");
    return;
  }
  res.cookie("tokenUser", user.tokenUser, { maxAge: 30 * 24 * 60 * 60 * 1000 });
  req.flash("success", "Đăng nhập tài khoản thành công");
  res.redirect("/");
};

module.exports.logout = async (req, res) => {
  res.clearCookie("tokenUser");
  req.flash("success", "Đăng xuất tài khoản thành công");
  res.redirect("/");
};
module.exports.forgotPassword = (req, res) => {
  res.render("client/pages/user/forgot", {
    pageTitle: "Quên mật khẩu",
  });
};
module.exports.forgotPasswordPost = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    req.flash("error", "Email không tồn tại");
    return res.redirect("/user/password/forgot");
  }

  const otp = generate.randomNumber(8);

  await ForgotPassword.findOneAndUpdate(
    { email: req.body.email },
    {
      otp: otp,
      expireAt: new Date()
    },
    {
      upsert: true,
      new: true
    }
  );
  sendEmailHelper.sendMail(req.body.email, "Mã OTP", `<p>Mã OTP của bạn là: <b>${otp}</b></p>`);

  req.flash(
    "success",
    "Đã gửi mã OTP đến email của bạn (giả lập)"
  );

  res.redirect(`/user/password/otp/?email=${req.body.email}`);
};


module.exports.otpPassword = (req, res) => {
  res.render("client/pages/user/otp", {
    pageTitle: "Nhập mã OTP",
    email: req.query.email
  });
}
module.exports.otpPasswordPost = async (req, res) => {
  const { email, otp } = req.body;
  const record = await ForgotPassword.findOne({ email: email, otp: otp });
  if (!record) {
    req.flash("error", "Mã OTP không đúng");
    res.redirect(`/user/password/otp/?email=${email}`);
    return;
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    req.flash("error", "Email không tồn tại");
    res.redirect(`/user/password/otp/?email=${email}`);
    return;
  }
  res.cookie("tokenUser", user.tokenUser);
  res.redirect("/user/password/reset");
}

module.exports.resetPassword = (req, res) => {
  res.render("client/pages/user/reset-password", {
    pageTitle: "Đặt lại mật khẩu",
  });
}

module.exports.resetPasswordPost = async (req, res) => {
  const { password, confirmPassword } = req.body;
  const tokenUser = req.cookies.tokenUser;
  if (password !== confirmPassword) {
    req.flash("error", "Mật khẩu xác nhận không khớp");
    res.redirect("/user/password/reset");
    return;
  }
  const user = await User.findOne({ tokenUser: tokenUser });
  if (!user) {
    req.flash("error", "Email không tồn tại");
    res.redirect("/user/password/reset");
    return;
  }
  await User.updateOne({ tokenUser: tokenUser }, { password: md5(password) });
  req.flash("success", "Đặt lại mật khẩu thành công");
  res.redirect("/");
}