const express = require('express')
const dotenv = require('dotenv')
// const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const app = express()
dotenv.config()

// Middleware
app.use(express.json())

// Routes middleware
app.use('/api/v1/user', authRoute, function (req, res) {
  res.sendStatus(500)
})

app.listen(process.env.JWT_SERVER_PORT || 3017, () => console.log(`JWT Server up an and running at http://localhost:${process.env.JWT_SERVER_PORT || 3017}`))
