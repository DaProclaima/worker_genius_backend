const dotenv = require('dotenv')
const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../models/user')
const { verifyToken } = require('../middleware/verifyToken')
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

router.get('/auth', verifyToken, (req, res) => {
  console.log('/auth hello')
  res.status(200).json({
    'code': 200
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
  console.log(salt)
  const hashedPassword = await bcrypt.hash(req.body.hash, salt)
  console.log(hashedPassword)
  const user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    username: req.body.username
  }

  try {
    const userModel = new UserModel(user)
    await userModel.setHash(req.body.hash, salt)
    userModel.setSlug()
    console.log(userModel)

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
  // res.json({req: req.header})
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
    user.comparePassword(user, req.body.hash, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: 'Authentication failed. Email or password is wrong.',
          err: err
        })
      }
      user.generateToken(user, (err, user) => {
        if (err) return res.status(400).send(err)
        // res.cookie('w_authExp', user.tokenExp)
        // res.cookie('w_auth', user.token).status(200)
        // user.toObject()
        // delete user.hash
        // res.status(201).json({
        //   loginSuccess: true,
        //   token: user.token
        // })
        res.status(201).header('auth-token', user.token).send(user.token)
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
    const listRefreshTokens = UserModel.find({token: req.headers['auth-token']}, function (err, result) {
      if (err) {
        console.error(err)
        res.status(500).json({
          'code': 500,
          'message': err
        })
      } else {
        res.status(200).json({
          'code': 200,
          'result': result
        })
      }
    })
    const authToken = req.headers['auth-token']
    const id = req.headers['id']
    if (authToken === null) {
      return res.status(401).json({
        'code': 401,
        'message': 'no refresh-token in header'
      })
    }
    const token = listRefreshTokens.map(token => token.user_id === id)
    if (!token) {
      if (!authToken === token.string) {
        return res.sendStatus(403).json({
          'code': 403,
          'message': 'invalid token'
        })
      }
      return res.status(403).json({
        'code': 403,
        'message': 'no token found like yours'
      })
    }
    jwt.verify(authToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({
          code: 403,
          message: err
        })
      }
      const accessToken = generateAccessToken({user_id: id}, authToken)
      res.header({'access-token': accessToken})
    })
  } catch (err) {
    console.log(err)
  }
})

router.delete('/logout', verifyToken, async (req, res) => {
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
