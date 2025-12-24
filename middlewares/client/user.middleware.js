const User = require("../../modules/user.model");
module.exports.inFo = async (req, res, next) => {
    if (req.cookies.tokenUser) {
      const tokenUser = req.cookies.tokenUser;
      const user = await User.findOne({ tokenUser: tokenUser }).select("-password");
      if (user) {
        res.locals.user = user;
      }

    }
    next();
}