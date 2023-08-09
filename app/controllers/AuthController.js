const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const { validationResult } = require('express-validator');

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