const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slug');
const shortid = require('shortid');

const JobOfferSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Title is required',
        trim: true
    },
    company: {
        type: String,
        trim: true
    },
    location: {
        type: String,
        required: 'Location is required',
        trim: true
    },
    salary: {
        type: String,
        default: 0,
        trim: true
    },
    contract: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        required: 'Title is required',
        trim: true
    },
    url: {
        type: String,
        lowercase: true
    },
    skills: [String],
    candidate: [{
        name: String,
        email: String,
        cv: String
    }]
});

JobOfferSchema.pre('save', function (next) {
    const url = slug(this.title);
    this.url = `${url}-${shortid.generate()}`;

    next();
});

module.exports = mongoose.model('JobOffer', JobOfferSchema);