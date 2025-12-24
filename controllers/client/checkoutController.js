const Cart = require("../../modules/cart.model.js");
const Product = require("../../modules/product.model.js");
const productHelper = require("../../helpers/product.js");
const Order = require("../../modules/order.model.js");
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
  res.render("client/pages/checkout/index", {
    pageTitle: "Đặt hàng",
    cartItems: cart,
  });
};

module.exports.order = async (req, res) => {
  const cartId = req.cookies.cartId;
  const userInfo = req.body;
  const cart = await Cart.findOne({ _id: cartId });
  const products = [];
  for (const item of cart.products) {
    const oject = {
      product_id: item.product_id,
      quantity: item.quantity,
      price: 0,
      discountPercentage: 0
    }
    const product = await Product.findOne({
      _id: item.product_id,
      deleted: false,
      status: "active",
    }).select("price discountPercentage");

    oject.price = product.price;
    oject.discountPercentage = product.discountPercentage;
    products.push(oject);
  }
  console.log("User Info:", userInfo);
  console.log("Products:", products);
  const orderInfo = {
    cart_id: cartId,
    userInfo: userInfo,
    products: products,
  }

  const newOrder = new Order(orderInfo);
  await newOrder.save();

  await Cart.updateOne({ _id: cartId }, { products: [] });
  req.flash("success", "Đặt hàng thành công");
  res.redirect(`/checkout/success/${newOrder.id}`);
}
module.exports.success = async (req, res) => {
  const orderId = req.params.orderId;
  const order = await Order.findOne({ _id: orderId });
  for (const item of order.products) {
    const productInfo = await Product.findOne({
      _id: item.product_id,
    }).select("title  thumbnail ");
    item.productInfo = productInfo;
    item.priceNew = productHelper.newPrice(item);
    item.totalPrice = item.priceNew * item.quantity;
  }
  console.log(order);
  res.render("client/pages/checkout/success", {
    pageTitle: "Đặt hàng thành công",
    orderId: orderId,
    orderItems: order,
  });
}