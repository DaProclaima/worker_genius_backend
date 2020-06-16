const dotenv = require('dotenv')
const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../models/user')
const RefreshToken = require('../models/refreshToken')
const { generateAccessToken, generateRefreshToken } = require('../manageToken')
const { registerValidation, loginValidation } = require('../payload-validator/authorization')

dotenv.config()
const host = process.env.DB_CONNECT || process.env.DB_CONNECT_LOCAL

// connect to db
const connect = mongoose.createConnection(host,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  },
  () => console.log('connected to db')
)

connect.on('error', (err) => {
  setTimeout(() => {
    console.log('[ERROR] api dbConnect() -> mongodb error')
  }, 5000)
  console.error(`[ERROR] api dbConnect() -> ${err}`)
})

connect.on('disconnected', () => {
  setTimeout(() => {
    console.log('[DISCONNECTED] api dbConnect() -> mongodb disconnected')
  }, 5000)
})

process.on('SIGINT', () => {
  connect.close(() => {
    console.log('[API END PROCESS] api dbConnect() -> close mongodb connection ')
    process.exit(0)
  })
})
const refreshTokenModel = connect.model('RefreshToken', RefreshToken)
const UserModel = connect.model('User', User)


router.post('/register', async (req, res) => {
  // check repeat password with password

  // Validate schema before to make an user
  try {
    const { error } = registerValidation(req.body)
    if (error) {
      return res.status(403).send(error.details[0].message)
    }
  } catch (error) {
    console.log(error)
  }

  // Check if user is already in db
  const emailExist = await UserModel.findOne({email: req.body.email})
  if (emailExist) {
    return res.status(400).send('Email already exists.')
  }

  // hash the password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.hash, salt)

  const user = {
    first_name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    hash: hashedPassword
  }

  try {
    const userModel = new UserModel(user)
    userModel.setSlug()
    // res.send({user: user._id})
    res.status(201).send({userModel})
    await userModel.save()
    // todo needs to create session from now to keep user logged in
  } catch (err) {
    console.log(err)
    res.status(400).send({'message': err})
  }
})

// Login
router.post('/login', async (req, res) => {
  const { error } = loginValidation(req.body)
  if (error) {
    return res.status(403).send(error.details[0].message)
  }

  // check email exists
  const user = await UserModel.findOne({ email: req.body.email })
  if (!user) {
    return res.status(400).send('Email or password is wrong.')
  }

  // checks password matches
  const validHash = await bcrypt.compare(req.body.hash, user.hash)
  if (!validHash) {
    return res.status(400).send('Email or password is wrong.')
  }

  // Creates and assign a token
  // const token = auth.sign({_id: user._id}, process.env.ACCESS_TOKEN_SECRET )
  const accessToken = generateAccessToken({_id: user._id}, process.env.ACCESS_TOKEN_SECRET)
  const newRefreshToken = generateRefreshToken({_id: user._id}, process.env.REFRESH_TOKEN_SECRET)

  const dbRefreshToken = new RefreshTokenModel(
    {
      user_id: user._id,
      string: newRefreshToken
    }
  )
  dbRefreshToken.save()
  res.header({ 'auth-token': accessToken, 'refresh-token': newRefreshToken, 'id': user._id }).send(
    { accessToken, newRefreshToken, user })

  // check if password is correct
})

router.post('/token/extend', async (req, res) => {
  try {
    const listRefreshTokens = refreshTokenModel.find({}, function (err, result) {
      if (err) {
        res.status(500).json({
          'code': 500,
          'message': err
        })
      } else {
        res.status(200).json(result)
      }
    })
  } catch (err) {
    console.log(err)
  }

  const refreshToken = req.headers['refresh-token']
  const id = req.headers['id']
  if (refreshToken === null) {
    return res.sendStatus(401)
  }
  if (!listRefreshTokens.map( token => token.user_id === id)) {
    if(! refreshToken === token.string) {
      return res.sendStatus(403).json({
        code: 403,
        message: 'invalid token'
      })
    }
    return res.sendStatus(403)
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403)
    }
    const accessToken = generateAccessToken({user_email: user.email})
    res.json({accessToken: accessToken})
  })
})

router.delete('/logout', async (req, res) => {
  try {
    RefreshTokenModel.findOneAndDelete({string: req.body.token}).then(model => {
      res.status(200).json(model || {})
    })
  } catch (err) {
    res.status(500).json({
      'code': 500,
      'message': err
    })
  }
  // refreshTokens.filter(token => token !== req.body.token)
  // res.sendStatus(204)
})

module.exports = router
