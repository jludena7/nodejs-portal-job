const passport = require('passport')
const crypto = require('crypto')
const sendEmail = require('../helpers/Email')
const { validationResult } = require('express-validator')
require('dotenv').config({ path: '.env' })
const dbDriver = require('../helpers/DbDriver')
const User = dbDriver.User

exports.createLogin = async (req, res) => {
  res.render('auth/create-login', {
    pageTitle: 'Login User',
    tagLine: 'Login to post job offers'
  })
}

exports.storeLogin = passport.authenticate('local', {
  successRedirect: '/account/dashboard',
  failureRedirect: '/login/create',
  failureFlash: true,
  badRequestMessage: 'Email and password are required'
})

exports.deleteLogin = (req, res) => {
  req.logout(function (error) {
    if (error) {
      return res.status(error.code).json({ message: error.message })
    }

    req.flash('success_msg', ['Session terminated'])
    return res.json({ url: `${process.env.BASE_URL}/login/create` })
  })
}

exports.createForgotPassword = (req, res) => {
  res.render('auth/create-forgot-password', {
    pageTitle: 'Forgot Password?',
    tagLine: 'Enter your email to recover your password'
  })
}

exports.storeForgotPassword = async (req, res) => {
  const validResult = validationResult(req)
  if (!validResult.isEmpty()) {
    req.flash('errors', validResult.array().map(error => error.msg))
    return res.redirect('/forgot-password/create')
  }

  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    req.flash('errors', ['Account does not exist'])
    return res.redirect('/login/create')
  }

  user.token = crypto.randomBytes(20).toString('hex')
  user.expiration = Date.now() + 3600000 // add 1 hour

  await user.save()
  const urlResetLink = `${process.env.BASE_URL}/reset-password/${user.token}`

  await sendEmail.send({
    user,
    subject: 'Recover Password',
    urlResetLink,
    template: 'recover-password-template'
  })

  req.flash('success', ['Please check your email, instructions to recover your password have been sent.'])
  res.redirect('/login/create')
}

exports.createResetPassword = async (req, res) => {
  const user = await User.findOne({
    token: req.params.token,
    expiration: {
      $gt: Date.now()
    }
  })
  if (!user) {
    req.flash('errors', ['Please link reset password is no longer valid, try again to recover the password'])
    return res.redirect('/forgot-password/create')
  }

  res.render('auth/create-reset-password', {
    pageTitle: 'Reset Password',
    token: req.params.token
  })
}

exports.storeResetPassword = async (req, res) => {
  const validResult = validationResult(req)
  if (!validResult.isEmpty()) {
    req.flash('errors', validResult.array().map(error => error.msg))
    return res.redirect('/reset-password/' + req.body.token)
  }

  const user = await User.findOne({
    token: req.body.token
  })

  if (!user) {
    req.flash('errors', ['Please link reset password is no longer valid, try again to recover the password'])
    return res.redirect('/forgot-password/create')
  }

  user.password = req.body.password
  user.token = undefined
  user.expiration = undefined

  await user.save()

  req.flash('success', 'Your password was updated successfully')
  res.redirect('/login/create')
}
