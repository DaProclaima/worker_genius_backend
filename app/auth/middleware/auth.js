const { User } = require('../../models/User')

let auth = (req, res, next) => {
  let authHeader = req.headers['authorization']
  let token = authHeader && authHeader.split(' ')[1]

  if (token === null) {
    return res.sendStatus(401)
  }

  User.findByToken(token, (err, user) => {
    if (err) throw err

    if (!user) {
      return res.json({
        isAuth: false,
        error: true
      })
    }

    res.token = token
    res.user = user
    next()
  })
}

module.exports = { auth }
