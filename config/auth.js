module.exports = {
    ensureAuthentication: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Please login to access this page');
        res.redirect('/users/login');
    }
}