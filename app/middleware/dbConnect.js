const mongoose = require('mongoose')

const Connect = {
  constructor () {
    this.host = process.env.DB_CONNECT || process.env.DB_CONNECT_LOCAL
    this.connect = mongoose.createConnection(this.host, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    this.connect.on('error', (err) => {
      setTimeout(() => {
        console.log('[ERROR] api dbConnect() -> mongodb error')
        return this.connect
      }, 5000)

      console.error(`[ERROR] api dbConnect() -> ${err}`)
    })

    this.connect.on('disconnected', () => {
      setTimeout(() => {
        console.log('[DISCONNECTED] api dbConnect() -> mongodb disconnected')
        return this.connect
      }, 5000)
    })

    process.on('SIGINT', () => {
      this.connect.close(() => {
        console.log('[API END PROCESS] api dbConnect() -> close mongodb connection ')
        process.exit(0)
      })
    })
    return this
  }
}
module.exports = Connect
