const Storage = require('./Storage')
require('dotenv').config({ path: '.env' })

module.exports = {
  selectSkills: (selected = [], options) => {
    const skills = ['HTML5', 'CSS3', 'CSSGrid', 'Flexbox', 'JavaScript', 'jQuery', 'Node', 'Angular', 'VueJS', 'ReactJS', 'React Hooks', 'Redux', 'Apollo', 'GraphQL', 'TypeScript', 'PHP', 'Laravel', 'Symfony', 'Python', 'Django', 'ORM', 'Sequelize', 'Mongoose', 'SQL', 'MVC', 'SASS', 'WordPress']

    let html = ''
    skills.forEach(skill => {
      html += `
                <li ${selected.includes(skill) ? ' class="active"' : ''}>${skill}</li>
            `
    })
    options.fn().html = html

    return options.fn().html
  },
  contractType: (selected, options) => {
    return options.fn(this).replace(
      new RegExp(` value="${selected}"`), '$& selected="selected"'
    )
  },
  showErrorValidations: (errors = {}, alerts) => {
    const categories = Object.keys(errors)
    let html = ''
    if (categories.length) {
      categories.forEach(category => {
        errors[category].forEach(message => {
          html += `<div class="${category} alert">
                    ${message}
                </div>`
        })
      })
    }
    alerts.fn().html = html

    return alerts.fn().html
  },
  pathProfileImage: () => {
    return Storage.config().profile.pathDown
  },
  pathCvFile: () => {
    return Storage.config().cv.pathDown
  },
  getAppName: () => {
    return process.env.APP_NAME
  }
}
