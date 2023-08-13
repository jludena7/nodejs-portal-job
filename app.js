const mongoose = require('mongoose');
require('./app/config/models');
const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const router = require('./app/routers/backend');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const connectMongo = require('connect-mongo');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const httpError = require('http-errors');
const passport = require('./app/helpers/Passport');
require('dotenv').config({path: '.env'});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.engine('handlebars',
    engine({
        defaultLayout: 'layout',
        helpers: require('./app/helpers/Handlebars')
    })
);
app.set('view engine', 'handlebars');
app.set('views', './app/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET,
    key: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 15 * 60000 }, // store for 15 minutes
    store: connectMongo.create({
        client: mongoose.connection.getClient()
    })
}));

app.use(passport.initialize({}));
app.use(passport.session({}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.errorValidations = req.flash();
    next();
});

app.use('/', router());
app.use((req, res, next) => {
    next(httpError(404, 'Page not found'));
});
app.use((error, req, res, next) => {
    res.locals.errorMessage = error.message;
    const status = error.status || 500;
    res.locals.errorStatus = status;
    res.status(status);
    res.render('error');
});
module.exports = app;