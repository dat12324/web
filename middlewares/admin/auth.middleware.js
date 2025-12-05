const Account = require("../../modules/account.model");
module.exports.requireAuth = (req, res, next) => {
  if (!req.cookies.token) {
    res.redirect("/admin/auth/login");
  } else {
    const user = Account.findOne({ token: req.cookies.token});
    if (!user) {
      res.redirect("/admin/auth/login");
      return;
    } else {
      next();
    }
  }
};
