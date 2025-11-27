// Require the correct model file (modules/product.model.js)
const Product = require('../../modules/product.model');

module.exports.index = async (req, res) => {
    console.log
    let find={
        deleted: false
    }
    if(req.query.status){
        find.status = req.query.status;
    }
    const products = await Product.find(find).sort({position: "desc"});
    console.log(products);

    res.render('client/pages/products/index',{
        pageTitle: 'Products Page',
        products: products
    });
}

module.exports.detail = async (req, res) => {
    const find = {
        slug: req.params.slug,
        deleted: false,
        status: 'active'
    };

    const product = await Product.findOne(find);
    if (!product) {
        return res.status(404).send('Product not found');
    }
    res.render('client/pages/products/detail', {
        pageTitle: product.title,
        product: product
    });
}


