const { model } = require("mongoose");
const Cart = require("../../modules/cart.model");
const Product = require("../../modules/product.model");
const productHelper = require("../../helpers/product.js");
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
  if (cart.products.length > 0) {
    for (const item of cart.products) {
      const product = await Product.findOne({
        _id: item.product_id,
        deleted: false,
        status: "active",
      }).select("title slug price thumbnail discountPercentage");

      product.priceNew = productHelper.newPrice(product);

      item.productInfo = product;
    }
  }
  res.render("client/pages/cart/index", {
    pageTitle: "Giỏ hàng của bạn",
    cartItems: cart,
  });
};

module.exports.deleted = async (req, res) => {
  const productId = req.params.productId;
  const cartId = req.cookies.cartId;

  await Cart.updateOne(
    { _id: cartId },
    { $pull: { products: { product_id: productId } } }
  );

  req.flash("success", "Xóa sản phẩm khỏi giỏ hàng thành công");
  res.redirect(req.get("Referer") || "/");
};

module.exports.updated = async (req, res) => {
  const productId = req.params.productId;
  const quantity = parseInt(req.params.quantity);
  const cartId = req.cookies.cartId;
  await Cart.updateOne(
    { _id: cartId, "products.product_id": productId },
    { $set: { "products.$.quantity": quantity } }
  );
  req.flash("success", "Cập nhật giỏ hàng thành công");
  res.redirect(req.get("Referer") || "/");
}