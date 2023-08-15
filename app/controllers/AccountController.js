const mongoose = require('mongoose');
const multer = require('multer');
const Storage = require('../helpers/Storage');
const User = mongoose.model('User');
const JobOffer = mongoose.model('JobOffer');
const UserAuth = require('../middleware/UserAuth');
const { validationResult } = require('express-validator');

exports.dashboard = async (req, res) => {
    const jobOfferList = await JobOffer.find({author: req.user._id}).lean();

    res.render('job-offer/list', {
        pageTitle : 'Dashboard',
        tagLine: 'Welcome to the dashboard',
        userAuth: UserAuth.userSession(req),
        jobOfferList
    });
};

exports.createProfile = async (req, res) => {
    res.render('account/create-profile', {
        pageTitle : 'Create Account',
        tagLine: 'Create your user account to publish job offers',
    });
};

exports.storeProfile = async (req, res) => {
    let validResult = validationResult(req);
    if (!validResult.isEmpty()) {
        req.flash('errors', validResult.array().map(error => error.msg));
        return res.redirect('/account/create-profile');
    }

    const user = new User(req.body);
    try {
        await user.save();
        res.redirect('/login/create');
    } catch (error) {
        req.flash('errors', [error]);
        res.redirect('/account/create-profile');
    }
};

exports.editProfile = async (req, res) => {
    res.render('account/edit-profile', {
        pageTitle : 'Edit Profile',
        tagLine: 'Update your user profile',
        user: req.user,
        userAuth: UserAuth.userSession(req),
    });
};

exports.updateProfile = async (req, res) => {
    let validResult = validationResult(req);
    if (!validResult.isEmpty()) {
        if (req.newRealPath) {
            await Storage.remove(req.newRealPath);
        }
        req.flash('errors', validResult.array().map(error => error.msg));
        return res.redirect('/account/edit-profile');
    }

    const user = await User.findById(req.user._id);
    user.name = req.body.name;
    if (req.body.password) {
        user.password = req.body.password;
    }
    if(req.file) {
        user.image = req.file.filename;
    }

    try {
        await user.save();
        req.flash('success', ['The data was updated successfully']);
    } catch (error) {
        req.flash('errors', [error]);
    }

    return res.redirect('/account/edit-profile');
};

const upload = multer(Storage.defineActions().profile).single('image');
exports.uploadImage = (req, res, next) => {
    upload(req, res, function(error) {
        if(error) {
            if(error instanceof multer.MulterError) {
                if(error.code === 'LIMIT_FILE_SIZE') {
                    req.flash('errors', ['The file is very large: Maximum 100kb']);
                } else {
                    req.flash('errors', [error.message]);
                }
            } else {
                req.flash('errors', [error.message]);
            }
            return res.redirect('/account/dashboard');
        } else {
            return next();
        }
    });
}