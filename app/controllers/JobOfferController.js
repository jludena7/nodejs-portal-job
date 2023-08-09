const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const UserAuth = require('../helpers/UserAuth');
const JobOffer = mongoose.model('JobOffer');

exports.create = async (req, res) => {
    res.render('job-offer/create', {
        pageTitle : 'Create New Job Offer',
        tagLine: 'Register information of the new vacancy',
        userAuth: UserAuth.userSession(req),
    });
};

exports.store = async (req, res, next) => {
    let validResult = validationResult(req);
    if (!validResult.isEmpty()) {
        req.flash('errors', validResult.array().map(error => error.msg));
        return res.redirect('/job-offer/create');
    }

    const jobOffer = new JobOffer(req.body);
    jobOffer.author = req.user._id;
    jobOffer.skills = req.body.skills.split(',');

    const newJobOffer = await jobOffer.save();
    if (!newJobOffer) {
        return next();
    }

    res.redirect(`/job-offer/${newJobOffer.url}`);
};

exports.edit = async (req, res, next) => {
    const jobOffer = await JobOffer.findOne({ url: req.params.url }).lean();
    if(!jobOffer) {
        return next();
    }

    res.render('job-offer/edit', {
        jobOffer,
        pageTitle : 'Details Job Offer',
        userAuth: UserAuth.userSession(req),
    });
};

exports.update = async (req, res, next) => {
    let validResult = validationResult(req);
    if (!req.params.url) {
        return next();
    }
    if (!validResult.isEmpty()) {
        req.flash('errors', validResult.array().map(error => error.msg));
        return res.redirect(`/job-offer/edit/${req.params.url}`);
    }

    const data = req.body;
    data.skills = req.body.skills.split(',');

    const updateJobOffer = await JobOffer.findOneAndUpdate(
        { url: req.params.url },
        data,
        {new: true, runValidators: true}
    );
    if(!updateJobOffer) {
        return next();
    }

    res.redirect(`/job-offer/${updateJobOffer.url}`);
};

exports.details = async (req, res, next) => {
    const jobOffer = await JobOffer.findOne({url: req.params.url}).populate('author').lean();
    if(!jobOffer) {
        return next();
    }

    res.render('job-offer/details', {
        jobOffer,
        pageTitle : 'Details Job Offer',
        userAuth: UserAuth.userSession(req),
    });
};

exports.delete = async (req, res, next) => {
    if (!req.params.id) {
        return next();
    }
    const jobOffer = await JobOffer.findById(req.params.id);
    if(UserAuth.verifyAuthor(req, jobOffer.author)){
        await JobOffer.findByIdAndRemove(req.params.id);
        res.status(200).send('Job offer was deleted');
    } else {
        res.status(403).send('Error')
    }
};