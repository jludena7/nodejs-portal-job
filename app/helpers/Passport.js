const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const dbDriver = require('../helpers/DbDriver')
const User = dbDriver.User

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    const user = await User.findOne({ email })
    if (!user) {
      return done(null, false, {
        message: 'Email or password is invalid'
      })
    }

    const isValid = user.validateLoginPassword(password)
    if (!isValid) {
      return done(null, false, {
        message: 'Email or password is invalid'
      })
    }

    return done(null, user)
  })
)

passport.serializeUser((user, done) => done(null, user._id))

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id).lean()
  return done(null, user)
})

module.exports = passport
