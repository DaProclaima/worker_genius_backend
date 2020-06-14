const jwt = require('jsonwebtoken')
const ms = require('ms')

const authenticateToken = function (req, res, next) {
  const token = req.headers['auth-token']
  if (!token) {
    return res.status(401).send('Access denied.')
  }

  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, _user) => {
      if (err) {
        // You have a token but it is no longer valid
        return res.status(403)
      }
    })
    req.user = verified
    next()
  } catch (err) {
    res.status(400).send('Invalid token.')
  }
}

const generateAccessToken = function (userId, accessTokenSecret) {
  return jwt.sign(userId, accessTokenSecret, { expiresIn: ms('5m') })
}

const generateRefreshToken = function (userId, refreshTokenSecret) {
  return jwt.sign(userId, refreshTokenSecret, { expiresIn: ms('3h') })
}

module.exports.authenticateToken = authenticateToken
module.exports.generateAccessToken = generateAccessToken
module.exports.generateRefreshToken = generateRefreshToken
