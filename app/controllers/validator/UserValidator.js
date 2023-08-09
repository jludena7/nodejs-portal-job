const { check } = require('express-validator');

exports.insertValidator = async (req, res, next) => {
    await check('name').notEmpty().withMessage('Name is empty').stripLow().run(req);
    await check('email').isEmail().withMessage('Email format invalid').stripLow().run(req);
    await check('password').isLength({min: 6}).withMessage('Password should have minimum 6 character').run(req);
    await check('repeat_password').equals(req.body.password).withMessage('Repeat Password should be same Password').run(req);

    return next();
};

exports.updateValidator = async (req, res, next) => {
    await check('name').notEmpty().withMessage('Name is empty').stripLow().run(req);
    if (req.body.password) {
        await check('password').isLength({min: 6}).withMessage('Password should have minimum 6 character').run(req);
        await check('repeat_password').equals(req.body.password).withMessage('Repeat Password should be same Password').run(req);
    }

    return next();
};