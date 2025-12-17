const Cart = require("../../modules/cart.model");
module.exports.cartId = async (req, res, next) => {
  if (!req.cookies.cartId) {
    const cart = new Cart();
    await cart.save();
    res.cookie("cartId", cart.id, {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    }); // 30 days
  } else {
    const cart = await Cart.findOne({ _id: req.cookies.cartId });
    const total = cart.products.reduce((acc, item) => acc + item.quantity, 0);
    res.locals.cartTotalQuantity = total;
  }
  next();
};
