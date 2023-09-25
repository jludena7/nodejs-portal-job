exports.isLogin = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }

  return res.redirect('/login/create')
}

exports.userSession = (req) => {
  if (req.isAuthenticated()) {
    return {
      active: true,
      name: req.user.name,
      image: req.user.image
    }
  }

  return { active: false }
}

exports.verifyAuthor = (req, author) => {
  if (!req.isAuthenticated()) {
    return false
  }

  if (author.equals(req.user._id)) {
    return true
  }

  return false
}
