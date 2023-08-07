const mongoose = require('mongoose');
const User = mongoose.model('User');
const { validationResult } = require('express-validator');

exports.create = async (req, res) => {
    res.render('user/create', {
        pageTitle : 'Create Account',
        tagLine: 'Create your user account to publish job offers',
    });
};

exports.store = async (req, res) => {
    let validResult = validationResult(req);
    if (!validResult.isEmpty()) {
        req.flash('errors', validResult.array().map(error => error.msg));
        return res.redirect('/user/create');
    }

    const user = new User(req.body);
    try {
        await user.save();
        res.redirect('/login/create');
    } catch (error) {
        req.flash('errors', [error]);
        res.redirect('/user/create');
    }
};