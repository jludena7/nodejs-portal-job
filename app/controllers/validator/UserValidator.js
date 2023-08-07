const { check } = require('express-validator');

exports.insertValidator = async (req, res, next) => {
    await check('name').escape().notEmpty().withMessage('Name is empty').run(req);
    await check('email').escape().isEmail().withMessage('Email format invalid').run(req);
    await check('password').escape().isLength({min: 6}).withMessage('Password should have minimum 6 character').run(req);
    await check('repeat_password').escape().equals(req.body.password).withMessage('Repeat Password should be same Password').run(req);

    return next();
};