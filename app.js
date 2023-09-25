const dbDriver = require('./app/helpers/DbDriver')
const express = require('express')
const { engine } = require('express-handlebars')
const path = require('node:path')
const router = require('./app/routers/backend')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const httpError = require('http-errors')
const passport = require('./app/helpers/Passport')
const sessionDriver = require('./app/helpers/SessionDriver')
const csrf = require('csurf')
const Handlebars = require('./app/helpers/Handlebars')
require('dotenv').config({ path: '.env' })

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.engine('handlebars',
  engine({
    defaultLayout: 'layout',
    helpers: Handlebars
  })
)
app.set('view engine', 'handlebars')
app.set('views', './app/views')
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())

app.use(csrf({ cookie: true }))
app.use((req, res, next) => {
  res.locals._csrfToken = req.csrfToken()
  next()
})

app.use(sessionDriver(dbDriver.mongoose))

app.use(passport.initialize({}))
app.use(passport.session({}))

app.use(flash())

app.use((req, res, next) => {
  res.locals.errorValidations = req.flash()
  next()
})

app.use('/', router())
app.use((req, res, next) => {
  next(httpError(404, 'Page not found'))
})
app.use((error, req, res, next) => {
  res.locals.errorMessage = error.message
  const status = error.status || 500
  res.locals.errorStatus = status
  res.status(status)
  return res.render('error')
})

module.exports = app
