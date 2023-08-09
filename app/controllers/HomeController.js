const mongoose = require('mongoose');
const JobOffer = mongoose.model('JobOffer');

exports.showJobOffer = async (req, res, next) => {
    const jobOfferList = await JobOffer.find().lean();
    if (!jobOfferList) {
        return next();
    }

    res.render('main/home', {
        pageTitle : 'Job Offer List',
        tagLine: 'Find and Post Jobs for Web Developers',
        bar: true,
        publishVacancy: true,
        jobOfferList: jobOfferList,
    });
};