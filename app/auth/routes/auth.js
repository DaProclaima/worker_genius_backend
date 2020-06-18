const dotenv = require('dotenv')
const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../models/user')
const { auth } = require('../middleware/auth')
// const RefreshToken = require('../models/refreshToken')
const { generateAccessToken } = require('../manageToken')
const { registerValidation, loginValidation } = require('../payload-validator/user')

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

const UserModel = connect.model('User', User)

router.get('/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    last_name: req.user.last_name
  })
})

router.post('/register', async (req, res) => {
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

  const usernameExist = await UserModel.findOne({username: req.body.username})
  if (usernameExist) {
    return res.status(400).send('Username already exists.')
  }

  // hash the password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.hash, salt)

  const user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    username: req.body.username,
    hash: hashedPassword
  }

  try {
    const userModel = new UserModel(user)
    userModel.setSlug()
    await userModel.save(err => {
      if (err) {
        return res.json({err: err})
      }
      // sendEmail(doc.email, doc.name, null, "welcome");
      return res.status(200).json({
        success: true
      })
    })

    delete userModel.hash
    // res.status(201).send({userModel})
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
    console.log(error)
    return res.status(403).send(error.details[0].message)
  }

  // check email exists
  await UserModel.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.status(400).json({
        loginSuccess: false,
        message: 'Authentication failed. Email or password is wrong.',
        err: err
      })
    }

    // checks password matches
    // const validHash = await bcrypt.compare(req.body.hash, user.hash)
    // if (!validHash) {
    //   return res.status(400).send('Email or password is wrong.')
    // }
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({ loginSuccess: false, message: 'Wrong password', err: err })
      }
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err)
        res.cookie('w_authExp', user.tokenExp)
        res.cookie('w_auth', user.token).status(200)
          .json({
            loginSuccess: true
          })
      })
    })
  })
})

//     // Creates and assign a token
//   // const token = auth.sign({_id: user._id}, process.env.ACCESS_TOKEN_SECRET )
//   const accessToken = generateAccessToken({_id: user._id}, process.env.ACCESS_TOKEN_SECRET)
//   const newRefreshToken = generateRefreshToken({_id: user._id}, process.env.REFRESH_TOKEN_SECRET)
//   const dbUser = new UserModel(
//     {
//       user_id: user._id,
//       string: newUser
//     }
//   )
//   await dbUser.save()
//   res.header({
//     'auth-token': accessToken,
//     'refresh-token': newRefreshToken,
//     'id': user._id })
//     .send({
//       accessToken,
//       newRefreshToken,
//       user })
//   // check if password is correct
// })

router.post('/token/extend', async (req, res) => {
  try {
    const listRefreshTokens = UserModel.find({}, function (err, result) {
      if (err) {
        console.error(err)
        res.status(500).json({
          'code': 500,
          'message': err
        })
      } else {
        res.status(200).json(result)
      }
    })
    const refreshToken = req.headers['refresh-token']
    const id = req.headers['id']
    if (refreshToken === null) {
      return res.sendStatus(401)
    }
    const token = listRefreshTokens.map(token => token.user_id === id)
    if (!token) {
      if (!refreshToken === token.string) {
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
      const accessToken = generateAccessToken({user_id: id}, refreshToken)
      res.header({'access-token': accessToken})
    })
  } catch (err) {
    console.log(err)
  }
})

router.delete('/logout', auth, async (req, res) => {
  try {
    UserModel.findOneAndDelete({string: req.headers['refresh-token']}).then(model => {
      res.status(200).json(model || {})
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      'code': 500,
      'message': err
    })
  }
  // refreshTokens.filter(token => token !== req.body.token)
  // res.sendStatus(204)
})

module.exports = router
