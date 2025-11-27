module.exports.createPost =  (req, res,next) => {
        if(!req.body.title){
            req.flash('error', 'Tiêu đề sản phẩm không được để trống');
            res.redirect('/admin/products/create');
            return
        }
        next();
    }


    