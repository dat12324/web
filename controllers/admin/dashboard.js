module.exports.dashboard = (req, res) => {
    res.render('admin/pages/dashboard/index',{
        pageTitle: 'Home Page',
        message: 'Welcome to the Home Page'
    });
}