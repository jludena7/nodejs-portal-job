const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');
const JobOfferController = require('../controllers/JobOfferController');
const JobOfferValidator = require('../controllers/validator/JobOfferValidator');
const UserValidator = require('../controllers/validator/UserValidator');
const AuthController = require('../controllers/AuthController');
const AccountController = require('../controllers/AccountController');
const CandidateController = require('../controllers/CandidateController');
const CandidateValidator = require('../controllers/validator/CandidateValidator');
const UserAuth = require('../helpers/UserAuth');

module.exports = () => {
    router.get('/', HomeController.showJobOffer);
    router.get('/job-offer/search', JobOfferController.search);
    router.get('/job-offer/detail/:url', JobOfferController.details);
    router.post('/candidate-store/job-offer/:url', CandidateController.uploadCV, CandidateValidator.contactValidator, CandidateController.storeContact);
    router.get('/candidate-list/job-offer/:id', CandidateController.candidateList);

    router.get('/login', AuthController.createLogin);
    router.get('/login/create', AuthController.createLogin);
    router.post('/login/store', AuthController.storeLogin);
    router.delete('/login/delete', AuthController.deleteLogin);
    router.get('/forgot-password/create', AuthController.createForgotPassword);
    router.post('/forgot-password/store', UserValidator.forgotPassword, AuthController.storeForgotPassword);
    router.get('/reset-password/:token', AuthController.createResetPassword);
    router.post('/reset-password/store', UserValidator.resetPassword, AuthController.storeResetPassword);

    router.get('/account/dashboard', UserAuth.isLogin, AccountController.dashboard);
    router.get('/account/create-profile', AccountController.createProfile);
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