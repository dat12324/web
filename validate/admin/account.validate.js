module.exports.createPost =  (req, res,next) => {
        if(!req.body.fullName){
            req.flash('error', 'Họ và tên không được để trống');
            res.redirect('/admin/accounts/create');
            return
        }
        if(!req.body.email){
            req.flash('error', 'Email không được để trống');
            res.redirect('/admin/accounts/create');
            return
        }
        next();
    }


    