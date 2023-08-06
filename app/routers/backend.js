const express = require('express');
const router = express.Router();
const MainController = require('../controllers/MainController');
const JobOfferController = require('../controllers/JobOfferController');

module.exports = () => {
    router.get('/', MainController.showJobs);
    router.get('/job-offer/:url', JobOfferController.details);

    router.get('/job-offer/create', JobOfferController.create);
    router.post('/job-offer/store', JobOfferController.store);
    router.get('/job-offer/edit/:url', JobOfferController.edit);
    router.post('/job-offer/update/:url', JobOfferController.update);

    return router;
};