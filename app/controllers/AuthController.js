const passport = require('passport');

exports.createLogin = async (req, res) => {
    res.render('login/create', {
        pageTitle : 'Login User',
        tagLine: 'Login to post job offers',
    });
};

exports.storeLogin = passport.authenticate('local', {
    successRedirect : '/account/dashboard',
    failureRedirect : '/login/create',
    failureFlash: true,
    badRequestMessage : 'Email and password are required'
});

exports.deleteLogin = (req, res, next) => {
    req.logout(function (error) {
        if (error) {
            return next(error);
        }

        req.flash('success_msg', 'Session terminated');
        res.redirect('/login/create');
    });
}