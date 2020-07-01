// const User = require('../../models/User')
// const { connect } = require('../middleware/dbConnect')
// const UserModel = connect.model('User', User)

let verifyToken = (req, res, next) => {
  let authHeader = req.headers['auth-token']
  let token = authHeader
  console.log(token)
  if (token === null) {
    return res.status(401).json({
      isAuth: false,
      'code': 401,
      'message': 'No token given'
    })
  }

  // console.log(req.headers)
  next()
}

module.exports = { verifyToken }
