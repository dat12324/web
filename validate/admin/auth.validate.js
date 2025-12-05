module.exports.loginPost =  (req, res,next) => {
        if(!req.body.email){
            req.flash('error', 'Email không được để trống');
            res.redirect('/admin/accounts/create');
            return
        }
        next();
    }


    