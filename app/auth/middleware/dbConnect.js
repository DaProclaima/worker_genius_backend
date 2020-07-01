const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const host = process.env.DB_CONNECT || process.env.DB_CONNECT_LOCAL

const connect = mongoose.createConnection(host, {
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

// console.log(connect)
module.exports = { connect }
