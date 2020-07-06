// const User = require('../../models/User')
// const { connect } = require('../middleware/dbConnect')
// const UserModel = connect.model('User', User)
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
dotenv.config()
let verifyToken = (req, res, next) => {
  let authToken = req.headers['auth-token']
  console.log(authToken)
  if (authToken === null) {
    return res.status(401).json({
      isAuth: false,
      'code': 401,
      'message': 'No token given'
    })
  }

  let datas = jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET)
  console.log(datas)
  next()
}

module.exports = { verifyToken }
