const {validationResult} = require('express-validator');
const JobOffer = require('../models/JobOffer');
const Storage = require('../helpers/Storage');
const AuthUser = require('../helpers/UserAuth');
const multer = require('multer');

const upload = multer(Storage.defineActions().cv).single('cv');
exports.uploadCV  =  (req, res, next) => {
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
            return res.redirect('back');
        } else {
            return next();
        }
    });
}

exports.storeContact = async (req, res, next) => {
    let validResult = validationResult(req);
    if (!validResult.isEmpty()) {
        if (req.newRealPath) {
            await Storage.remove(req.newRealPath);
        }
        req.flash('errors', validResult.array().map(error => error.msg));
        return res.redirect('back');
    }

    const jobOffer = await JobOffer.findOne({ url: req.params.url });
    if(!jobOffer) {
        return next();
    }

    const newCandidate = {
        name: req.body.name,
        email: req.body.email,
        cv : req.file.filename
    }

    jobOffer.candidates.push(newCandidate);
    await jobOffer.save();

    req.flash('success', 'Your CV was sent successfully');

    res.redirect(`/job-offer/${jobOffer.url}`);
};