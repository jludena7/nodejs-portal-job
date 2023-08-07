const mongoose = require('mongoose');
require('dotenv').config({path: '.env'});

mongoose.connect(process.env.DB_HOST, {useNewUrlParser: true});
mongoose.connection.on('error', (error) => {
    console.log(error);
});

require('../models/JobOffer');
require('../models/User');