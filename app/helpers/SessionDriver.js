const session = require('express-session')
const connectMongo = require('connect-mongo')

module.exports = (mongoose) => {
  return session({
    secret: process.env.SESSION_SECRET,
    key: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 15 * 60000 }, // store for 15 minutes
    store: connectMongo.create({
      client: mongoose.connection.getClient()
    })
  })
}
