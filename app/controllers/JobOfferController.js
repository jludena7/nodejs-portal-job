const mongoose = require('mongoose');
const JobOffer = mongoose.model('JobOffer');

exports.create = async (req, res) => {
    res.render('job-offer/create', {
        selectSkills: {},
        pageTitle : 'Create New Job Offer',
        tagLine: 'Register information of the new vacancy',
    });
};

exports.store = async (req, res) => {
    const jobOffer = new JobOffer(req.body);
    jobOffer.skills = req.body.skills.split(',');

    const newJobOffer = await jobOffer.save();

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
    });
};

exports.update = async (req, res, next) => {
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
    const jobOffer = await JobOffer.findOne({ url: req.params.url }).lean();
    if(!jobOffer) {
        return next();
    }

    res.render('job-offer/details', {
        jobOffer,
        pageTitle : 'Details Job Offer',
    });
};