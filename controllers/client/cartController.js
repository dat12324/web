const { model } = require("mongoose");
const Cart = require("../../modules/cart.model");

module.exports.add = async (req, res) => {
  const productId = req.params.productId;
  const quantity = parseInt(req.body.quantity);
  const cartId = req.cookies.cartId;

  const cart = await Cart.findOne({ _id: cartId });

  const existingProduct = cart.products.find(
    (item) => item.product_id == productId
  );

  if (existingProduct) {
    const newQuantity = existingProduct.quantity + quantity;
    console.log("New Quantity:", newQuantity);
    await Cart.updateOne(
      { _id: cartId, "products.product_id": productId },
      { $set: { "products.$.quantity": newQuantity } }
    );
    req.flash("success", "Cập nhật giỏ hàng thành công");
    res.redirect(req.get("Referer") || "/");  
  } else {
    const ojectCart = {
      product_id: productId,
      quantity: quantity,
    };
    await Cart.updateOne({ _id: cartId }, { $push: { products: ojectCart } });
    req.flash("success", "Thêm vào giỏ hàng thành công");
    res.redirect(req.get("Referer") || "/");
  }
};

module.exports.index = async (req, res) => {
  const cartId = req.cookies.cartId;
  const cart = await Cart.findOne({ _id: cartId });
  res.render("client/pages/cart/index", {
    pageTitle: "Giỏ hàng của bạn",
    cart: cart,
  });
};