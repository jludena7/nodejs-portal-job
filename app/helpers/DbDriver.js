const dbConfig = require('../config/database')

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to the database!')
}).catch(error => {
  console.log('Cannot connect to the database!', error)
  process.exit()
})

const dbDriver = {}
dbDriver.JobOffer = require('../models/JobOffer')(mongoose)
dbDriver.User = require('../models/User')(mongoose)
dbDriver.mongoose = mongoose

module.exports = dbDriver
