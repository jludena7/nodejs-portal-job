const emailConfig = require('../config/email')
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const util = require('node:util')
const path = require('node:path')

const transport = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  auth: {
    user: emailConfig.user,
    pass: emailConfig.pass
  }
})

// Use handlebars templates
transport.use('compile', hbs({
  viewEngine: {
    extName: '.handlebars',
    layoutsDir: path.join(__dirname, '..', 'views/emails/layouts'),
    defaultLayout: 'layout'
  },
  extName: '.handlebars',
  viewPath: path.join(__dirname, '..', 'views/emails')
}))

module.exports.send = async (options) => {
  const optionsEmail = {
    from: 'PortalJob <noreply@portaljob.com',
    to: options.user.email,
    subject: options.subject,
    template: options.template,
    context: {
      urlResetLink: options.urlResetLink
    }
  }

  const sendMail = util.promisify(transport.sendMail, transport)
  return sendMail.call(transport, optionsEmail)
}
