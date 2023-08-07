const { check } = require('express-validator');

exports.saveValidator = async (req, res, next) => {
    await check('title').escape().notEmpty().withMessage('Title is empty').run(req);
    await check('location').escape().notEmpty().withMessage('Location is empty').run(req);
    await check('company').escape().notEmpty().withMessage('Company is empty').run(req);
    await check('salary').escape().notEmpty().withMessage('Salary is empty').run(req);
    await check('contract').escape().notEmpty().withMessage('Contact is empty').run(req);
    await check('description').escape().notEmpty().withMessage('Description is empty').run(req);
    await check('url').escape().notEmpty().withMessage('Url is empty').run(req);

    return next();
};