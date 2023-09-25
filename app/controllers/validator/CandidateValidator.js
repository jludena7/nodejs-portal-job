const { check } = require('express-validator')

exports.contactValidator = async (req, res, next) => {
  await check('name').notEmpty().withMessage('Name is empty').stripLow().run(req)
  await check('email').isEmail().withMessage('Email format invalid').stripLow().run(req)
  if (!req.file) {
    await check('cv').notEmpty().withMessage('Doc is required').run(req)
  }

  return next()
}
