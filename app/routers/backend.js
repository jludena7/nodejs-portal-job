const express = require('express');
const router = express.Router();
const MainController = require('../controllers/MainController');
const JobOfferController = require('../controllers/JobOfferController');
const JobOfferValidator = require('../controllers/validator/JobOfferValidator');
const UserController = require('../controllers/UserController');
const UserValidator = require('../controllers/validator/UserValidator');

module.exports = () => {
    router.get('/', MainController.showJobs);
    router.get('/job-offer/:url', JobOfferController.details);

    router.get('/job-offer/create', JobOfferController.create);
    router.post('/job-offer/store', JobOfferValidator.saveValidator,  JobOfferController.store);
    router.get('/job-offer/edit/:url', JobOfferController.edit);
    router.post('/job-offer/update/:url', JobOfferValidator.saveValidator, JobOfferController.update);

    router.get('/user/create', UserController.create);
    router.post('/user/store', UserValidator.insertValidator, UserController.store);

    return router;
};