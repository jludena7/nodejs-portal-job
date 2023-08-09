const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');
const JobOfferController = require('../controllers/JobOfferController');
const JobOfferValidator = require('../controllers/validator/JobOfferValidator');
const UserValidator = require('../controllers/validator/UserValidator');
const AuthController = require('../controllers/AuthController');
const AccountController = require('../controllers/AccountController');
const UserAuth = require('../helpers/UserAuth');

module.exports = () => {
    router.get('/', HomeController.showJobOffer);
    router.get('/job-offer/:url', JobOfferController.details);

    router.get('/login', AuthController.createLogin);
    router.get('/login/create', AuthController.createLogin);
    router.post('/login/store', AuthController.storeLogin);
    router.get('/login/delete', AuthController.deleteLogin);

    router.get('/account/dashboard', UserAuth.isLogin, AccountController.dashboard);
    router.get('/account/create-profile', UserAuth.isLogin, AccountController.createProfile);
    router.post('/account/store-profile', UserAuth.isLogin, UserValidator.insertValidator, AccountController.storeProfile);
    router.get('/account/edit-profile', UserAuth.isLogin, AccountController.editProfile);
    router.post('/account/update-profile', UserAuth.isLogin, AccountController.uploadImage, UserValidator.updateValidator, AccountController.updateProfile);

    router.get('/job-offer/create', UserAuth.isLogin, JobOfferController.create);
    router.post('/job-offer/store', UserAuth.isLogin, JobOfferValidator.saveValidator,  JobOfferController.store);
    router.get('/job-offer/edit/:url', UserAuth.isLogin, JobOfferController.edit);
    router.post('/job-offer/update/:url', UserAuth.isLogin, JobOfferValidator.saveValidator, JobOfferController.update);
    router.delete('/job-offer/delete/:id', UserAuth.isLogin, JobOfferController.delete);

    return router;
};