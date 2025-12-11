const Product = require('../../modules/product.model');
const productHelper  = require('../../helpers/product.js');
module.exports.index = async (req, res) => {
    const productsFeatured = await Product.find({ 
        deleted: false, 
        status: 'active',
        featured:"1" })
    const newProduct = productHelper.productNewPrice(productsFeatured);
    console.log(newProduct);

    const productNew = await Product.find({ 
        deleted: false, 
        status: 'active'}).sort("desc").limit(6);
    const newProducts = productHelper.productNewPrice(productNew);

    
    res.render('client/pages/home/index',{
        pageTitle: 'Home Page',
        message: 'Welcome to the Home Page',
        productsFeatured: newProduct,
        productNew: newProducts

    });
}   