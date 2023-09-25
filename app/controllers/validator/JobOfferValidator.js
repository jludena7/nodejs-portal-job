const { check } = require('express-validator')

exports.saveValidator = async (req, res, next) => {
  await check('title').notEmpty().withMessage('Title is empty').stripLow().run(req)
  await check('location').notEmpty().withMessage('Location is empty').stripLow().run(req)
  await check('company').notEmpty().withMessage('Company is empty').stripLow().run(req)
  await check('salary').optional({ checkFalsy: true }).isNumeric().withMessage('Salary is numeric').run(req)
  await check('contract').notEmpty().withMessage('Contract is empty').stripLow().run(req)
  await check('description').notEmpty().withMessage('Description is empty').run(req)

  return next()
}
