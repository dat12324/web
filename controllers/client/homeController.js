module.exports.index = (req, res) => {
    res.render('client/pages/home/index',{
        pageTitle: 'Home Page',
        message: 'Welcome to the Home Page'
    });
}